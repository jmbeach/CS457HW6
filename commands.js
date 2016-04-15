DBQuery.shellBatchSize = 30
// #1
print("\nQUESTION1\n");
db.HW6.count()
// #2
print("\nQUESTION2\n");
db.HW6.find({type:"PublicEvent"}).pretty()
// #3 
print("\nQUESTION3\n");
var questionThreeCursor = db.HW6.find({type:"PublicEvent"})
while(questionThreeCursor.hasNext()) {
	printjson(questionThreeCursor.next());
}
// #4
print("\nQUESTION4\n");
db.HW6.find({type:"GollumEvent"}).count()
// #5 - List the member login and member id of the payload for members who have an event type of MemberEvent, and use the cursor sort to sort the result by the member's login.
print("\nQUESTION5\n");
db.HW6.find({type:"MemberEvent"},{"payload.member.login":1, "payload.member.id":1,"_id":0}).sort({"payload.member.login":1})
// #6 - For all type Member Events that have an actor id < 1200000, list its actor id and repo name.
print("\nQUESTION6\n");
db.HW6.find({type:"MemberEvent","actor.id":{$lt:1200000}},{"actor.id":1,"repo.name":1,"_id":0})
// #7 - For all type Member Events that have an actor id < 1200000 or > 10000000, list its actor id and repo name.
print("\nQUESTION7\n");
db.HW6.find({type:"MemberEvent",$or:[{"actor.id":{$lt:1200000}},{"actor.id":{$gt:10000000}}]},{"actor.id":1,"repo.name":1,"_id":0})
// #8 - Count the number of events that have a labels color field for the payload issue.
print("\nQUESTION8\n");
db.HW6.find({"payload.issue.labels.color":{$exists:true}}).count()
// #9 - For all documents in the collection with a public field, determine if any of the events are NOT public. e.g. false. 
print("\nQUESTION9\n");
db.HW6.find({"public":{$exists:true},"public":false}).count() > 0
// #10 - For all events that have an id > 2489678837 and do not have a field for the payload issue user, list its id. 
print("\nQUESTION10\n");
db.HW6.find({"id":{$gt:"2489678837"}, "payload.issue.user":{$exists:false}},{"id":1,"_id":0})
// #11 - List the maximum id value (not the _id).  Note do not use $max.
print("\nQUESTION11\n");
var questionElevenCursor = db.HW6.find().sort({"id":-1})
print(questionElevenCursor[0].id)
// #12 - Using pipeline aggregation, group the documents by payload pull_request state to find the maximum value of the payload issue number.  Print each payload pull_request state and its maximum value.
print("\nQUESTION12\n");
db.HW6.aggregate([
	{$group: {_id:"$payload.pull_request.state",maxId:{$max:"$payload.issue.number"}}}
]).pretty();
// #13 - Use the aggregate sort to order the result from question 12. by payload pull_request state.
print("\nQUESTION13\n");
db.HW6.aggregate([
	{$group: {_id:"$payload.pull_request.state",maxId:{$max:"$payload.issue.number"}}}
	,{$sort: {_id:-1}}
]).pretty();
print("\nQUESTION14\n");
// #14 - Using the single purpose aggregation operation of group, group the documents by payload pull_request state to count the number of occurrences of each payload pull_request state.  Print each payload pull_request state  and its count.  There is an example of this in the MongoDB documentation - look for Single Purpose Aggregation Operations. You just have to tweak it a little.
db.HW6.group(
	{
		key: { "payload.pull_request.state":1 }
		,reduce: function(curr,result) {
			result.total += 1
		}
		,initial: {total: 0}
	}
)
