import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const Resourceschema = new Schema ({

    _id: {
        type: String,
        default:uuid.v1
    },
    resource_name: String,
    resource_type: String,
    roles: [],
    components:[Object],
    created_at: {
        type: Date,
        default: Date.now
    }
})