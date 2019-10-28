module.exports = function (app) {

    var tag_controller = require('../controllers/tagController');
    app.route('/tags').get(tag_controller.get_all_tags);
    app.route('/tags/name/:name').get(tag_controller.get_a_tag_by_name);

    app.route('/tags/create').post(tag_controller.create_a_tag);



}