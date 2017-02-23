Todos = new Mongo.Collection("todos");

Session.set("sortOrder", 1);

Template.todoList.helpers({
	todos: function() {
		return Todos.find({}, {sort: {createdAt: Session.get("sortOrder")}});
	}
});

Template.todoList.events({
	"click .add-todo": function(event, template){
		Todos.insert({
			label: "New TODO",
			createdAt: new Date()
		});
	},
	"click #reverse-sort": function(event, template){
		Session.set("sortOrder", Session.get("sortOrder", 1) * -1);
	}
});


Template.todo.helpers({
	done: function() {
		return Todos.findOne({_id: this._id}).done;
	}
});

Template.todo.events({
	"click .done": function(event, template){
		var isDone = Todos.findOne({_id: this._id}).done;
		Todos.update({_id: this._id}, {$set: {done: !isDone}});
	},
	"click .delete": function(event, template){
		Todos.remove({_id: this._id});
	}
});
