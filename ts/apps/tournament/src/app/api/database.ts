import * as mongoose from 'mongoose';
export class myDB {
public static async initDB() {
  return mongoose.connect('mongodb+srv://jaunni:archilogynov2021@cluster0.demen.mongodb.net/tournament-ynov?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
public static async closeCon() {
  return mongoose.connection.close(true);
}}
