
CloudspiderTags = new Mongo.Collection('cloudspider_tags');

if(Meteor.isClient) {
    Meteor.subscribe('cloudspider_tags');
}


if(Meteor.isServer) {
    CloudspiderTags.allow({
        insert: function () {
            return true;
        }
    });

    Meteor.publish('cloudspider_tags', function() {
        return CloudspiderTags.find({});
    });

}



TagsUtil = {
    findOrCreate: function(title) {
        var name = this.toSlug(title); //Sanitized url valid tagname

        var tag = CloudspiderTags.findOne({
            name: name
        });
console.log(tag);
        if(tag) {
            return tag;
        }
        CloudspiderTags.insert({
            name: name,
            title: title,
            visitCount: 0
        });

        return CloudspiderTags.findOne({
            name: name
        });

    },

    toSlug: function(str) {
        return str.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    },



};


