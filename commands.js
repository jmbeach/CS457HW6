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
// #5
print("\nQUESTION5\n");
db.HW6.find({type:"MemberEvent"},{"actor.login":1, "actor.id":1,"_id":0}).sort({"actor.login":1})
// #6 - For all type Member Events that have an actor id < 1200000, list its actor id and repo name.
print("\nQUESTION6\n");
db.HW6.find({type:"MemberEvent","actor.id":{$lt:1200000}},{"actor.id":1,"repo.name":1,"_id":0})
// #7 - For all type Member Events that have an actor id < 1200000 or > 10000000, list its actor id and repo name.
print("\nQUESTION7\n");
db.
