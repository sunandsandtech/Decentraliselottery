const cinstance = require("./../Services/instance.js");

// constructor
const Result = function (log) {
  this.logid = log.logid;
  this.user = log.user;
  this.referrer = log.referrer;
  this.referrerId = log.referrerId;
  this.userid = log.userid;
  this.matrix = log.matrix;
  this.level = log.level;
  this.blocktime = log.blocktime;
  this.eventname = log.eventname;
  this.place = log.place;
  this.caller = log.caller;
  this.transactionhash = log.transactionhash;
  this.receiver = log.receiver;
  this.froom = log.from;
  this.value = log.value;
  this.reinvestnumber = log.reinvestnumber;
  this.myid = log.myid;
  this.otherid = log.otherid;
};
 
Result.getAll = result => {
    let lotterylist=[]
    cinstance.methods
        .lotteryId()
        .call()
        .then((resp) => {
            console.log("res",resp)
        for(var i=1;i<=resp ; i++){
          cinstance.methods
            .lottery(i)
            .call()
            .then((response) => {
             lotterylist.push(response)
             console.log(lotterylist,"list")
             result(null, lotterylist);
             return;
            })
            .catch((err) =>{
                result(err, null);
                return;
            });
        }
       })    
}

Result.findById = (req, result) => {
    console.log(req)
    var lotterylist = [];
    result(null, {"Result":["5","6","9"]});
    return;
    // for (uint ticketid = 0; ticketid < LotteryDatas.Tickets.length; ticketid++) {
    //   count=0;
    //   for (uint numpos = 0; numpos < LotteryDatas.picknumbers; numpos++) {
    //       if(numpos==1&&count==0)
    //       break;
    //       for (uint winnumpos = 0; winnumpos < winner.length; winnumpos++) {
    //       if(winner[winnumpos]==LotteryDatas.Tickets[ticketid].numbers[numpos]){
    //        count=count+1;
    //        break;
    //        }
    //       }
    //       if(count==LotteryDatas.picknumbers)
    //       useraddressdata[p++] = LotteryDatas.Tickets[ticketid].user;
    //   }
    //   }
    //   count=0;
    //   for(uint userpos = 0; userpos < p; userpos++){
    //       if(useraddressdata[userpos]!= address(0)){
    //           count++;
    //       }
    //   }
    // cinstance.methods.lottery(req).call().then( resp=>{
    //   console.log(resp,"winner")
    //   cinstance.getPastEvents(
    //     "lotteryresuls",
    //     { 
    //       filter: { lotteryId: `${req}` },        
    //       fromBlock: 0 , 
    //       toBlock: "latest" 
    //     }, (errors, events) => {
    //          if (!errors) {
    //           console.log(events[0]&&events[0].returnValues&&events[0].returnValues.numbers)
    //          }
    // cinstance.getPastEvents(
    //     "lotterybought",
    //     {
    //       filter: { lotteryId: `${req}` },
    //       fromBlock: 0,
    //       toBlock: "latest",
    //     },
    //     (errors, events) => {
    //       if (!errors) {
    //         events.forEach((i) => lotterylist.push(i.returnValues));
    //         result(null, lotterylist);
    //         return;
    //       }
    //     }
    //   );
    // })
    // //   result(null, lotterylist);
    // //  return
    // })
};
module.exports = Result;
