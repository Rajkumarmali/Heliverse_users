const Teams = require("../model/team");
const Users = require("../model/users");

const createTeamConteroller = async (req, res) => {
    try {
        const { teamName, members } = req.body;
        const existingTeam = await Teams.findOne({ teamName });
        if (existingTeam) {
            return res.status(400).json({ error: 'Team name already exists' });
        }
        const userObjects = await Users.find({ _id: { $in: members } });

        const newTeam = new Teams({
            teamName,
            members: userObjects.map(user => user._id),
        });
        await newTeam.save();
        res.send({
            success: true,
            message: "Team created successfully"
        })
    } catch (err) {
        res.send({
            success: false,
            message: "Error creating team"
        })
    }
}
const getTeamDetailController = async (req, res) => {
    try {
        const teams = await Teams.find();
        const memberIds = teams.reduce((ids, team) => [...ids, ...team.members], []);
        const members = await Users.find({ _id: { $in: memberIds } });

        const teamsWithMembers = teams.map(team => ({
            _id: team._id,
            teamName: team.teamName,
            members: members.filter(member => team.members.includes(member._id))
        }));

        res.send({
            success: true,
            teams: teamsWithMembers,
        });
    } catch (err) {
        console.log("Error in get Team", err);
        res.status(500).send({
            success: false,
            error: "Internal Server Error"
        });
    }
};


module.exports = { createTeamConteroller, getTeamDetailController }