const {ModelType} = require('@src/constants');

class CalendarItem {
    constructor(_id, id, 
                text = '', 
                model_type = ModelType.absence,
                parent_id = 0, 
                unscheduled = true,
                start_date = new Date(Date.now()), 
                end_date = new Date(Date.now()), 
                dates =[] ) {
        this.type = 'task';
        this._id = _id;
        this.id = id;
        this.text = text;
        this.model_type = model_type;
        this.parent_id = parent_id;
        this.unscheduled = unscheduled;
        this.start_date = start_date;
        this.end_date = end_date;
        this.dates = dates;

    }
}

module.exports.CalendarItem = CalendarItem;