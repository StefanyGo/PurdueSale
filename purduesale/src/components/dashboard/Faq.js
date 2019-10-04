import React from 'react'

const Faq = () => {
    return (
        <div >
            <div className="card z-depth-0s">
                <div className="card-content">
                    <h1>FAQ</h1>
                    <div style={{width: "75%", float: "center", paddingLeft: "25%", fontSize: 35}}>What is PurdueSale?</div>
                    <br/>
                    <p style={{width: "75%", float: "center", paddingLeft: "25%"}}>Every semester, students move in and out and they struggle to make the places they stay at school their second home. While they have access to places such as Craigslist and Facebook groups for the buying and selling of various items and furniture, the risk of trading with strangers or the need to travel a long distance can pose great inconvenience. PurdueSale is intended to provide the students and faculty at Purdue a platform to exclusively trade with others on the campus for their convenience while providing chances for users to socialize and make friends.</p>
                    <br/><br/><br/>
                    <div style={{width: "75%", float: "center", paddingLeft: "25%", fontSize: 35}}>Why can I only sign up using my Purdue email address?</div>
                    <br/>
                    <p style={{width: "75%", float: "center", paddingLeft: "25%"}}>The focus of this site is to provide exclusively for Purdue University students and faculty members. This is because we want to create a safe and secure environment for Purdue students and faculty members to trade their goods within the University campus. By having only registered Purdue University students and faculty members involved in the trade, we can lessen the occurrence of scams as their Purdue identification can be used to hold more accountability towards their actions. We will verify our users by validating their Purdue email addresses.</p>
                    <br/><br/><br/>
                    <div style={{width: "75%", float: "center", paddingLeft: "25%", fontSize: 35}}>How can I return an item or ask for refund?</div>
                    <br/>
                    <p style={{width: "75%", float: "center", paddingLeft: "25%"}}>You cannot refund or return purchased items. If you really insist, try to set up your own meeting with the seller through our chat feature.</p>
                </div>
            </div>
        </div>
    )
}

export default Faq