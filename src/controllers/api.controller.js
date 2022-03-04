import fetch from "node-fetch";
import env from "dotenv"
env.config()

class LeetcodeApi{

    static OPTIONS = {
            method:"POST",
            headers: { "Content-Type": "application/json" }
        }

    getLeetCodeUserData(req,res){
        const username = req.params.username;

        if(username !== null || username !== undefined){

            LeetcodeApi.OPTIONS['body']=JSON.stringify({
                query:process.env.QUERY,
                variables:{"username":`${username}`},
                })

            fetch(process.env.URL,LeetcodeApi.OPTIONS)
            .then(result=>result.json())
            .then(data => !data.errors?(res.send(data)):(res.json({message: data?.errors[0]?.message}))).catch(err=>console.error(err))
        }else res.json({message: "username invalid"});
    }

    getLeetCodeUserContestDetails(req,res){
        const username = req.params.username;

        if(username !== null || username !== undefined){
        LeetcodeApi.OPTIONS['body']=JSON.stringify({
            query:process.env.QUERY2,
            variables:{"username":`${username}`},
            })

        fetch(process.env.URL,LeetcodeApi.OPTIONS)
        .then(res=>res.json())
        .then(contestdata => {

            if(!contestdata.errors){
            const ranks = contestdata?.data?.userContestRanking;
            const filtered = contestdata?.data?.userContestRankingHistory?.filter(con => con?.attended === true)
            const data  = {userContestRanking: ranks, userContestRankingHistory:filtered};
            res.send(data);

            }else res.json({message: contestdata?.errors[0]?.message})
        })
        .catch(err=>console.error(err));
      }else res.json({message: "username invalid"});
    }


    
}

export {LeetcodeApi}