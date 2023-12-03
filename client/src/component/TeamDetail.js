import React, { useEffect, useState } from 'react';

const TeamDetail = () => {
    const [teamDetail, setTeamDetail] = useState();

    const fetchTeam = async () => {
        try {
            const response = await fetch('http://localhost:3001/team/api//deatil', {
                method: "GET",
                headers: {

                }
            })
            const responseData = await response.json()
            //console.log(responseData.teams)
            setTeamDetail(responseData?.teams)
            // console.log(teamDetail)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchTeam()
    }, [])

    return (
        <div >
            {teamDetail && teamDetail.map((team) => (
                <div key={team._id} >
                    <h3 className='text-center'>{team.teamName}</h3>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            {team.members.map((member) => (
                                <div key={member._id} className='card col-12 col-md-6 col-lg-3 bg-light' style={{ width: '18rem', margin: '1rem' }}>
                                    <div className='card-body'>
                                        <img src={member.avtar} alt='' />
                                        <p>Name : {member.firstName} {member.lastName}</p>
                                        <p>Email : {member.email}</p>
                                        <p>Gender : {member.gender} </p>
                                        <p>Domain : {member.domain}</p>
                                        <p> Available : {member.available}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default TeamDetail;
