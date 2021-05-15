const numberOfUsers = 10
var team = {
    id: {
        chance: 'guid'
    },
    name: {
         faker: "lorem.words"
    },
};

var user = {
    id: {
        chance: 'guid'
    },
    name: {
         faker: "name.firstName"
    },
        teamId: {
        hasOne: 'teams',
        get:'id',
        unique: true
    },
};

var counter = {
    id: {
        chance: 'guid'
    },
    value: {
        static:0
    },
     userId: {
     function:function() {
            return  this.db.users[this.db.counters.length].id
     }
    },
    
};

mocker()
    .schema('teams', team, 2)
    .schema('users', user, numberOfUsers)
    .schema('counters', counter, numberOfUsers)
