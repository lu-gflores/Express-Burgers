const connection = require('./connection.js');
var printQuestMarks = num =>{
    let arr = [];
    for(let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

var objToSql = ob => {
    let arr = [];
    for (let key in ob) {
      let value = ob[key];    
      if (Object.hasOwnProperty.call(ob, key)) {     
       if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }  
      arr.push(key + "=" + value);
      }
    }
  
    return arr.toString();
  }

var orm = {    
    selectAll: function(tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, (err, result) => {
            if(err) throw err;
            cb(result);
        })
        
    },
    insertOne: function(table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestMarks(vals.length);
        queryString += ") ";
        
        console.log(queryString);
        connection.query(queryString, vals, (err, result) =>{
            if (err) throw err;
            cb (result);
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, (err, result) => {
            if(err) throw err;
            cb(result);
        })
        
    },
    delete: function(table, condition, cb) {
        let queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;
        connection.query(queryString, (err, result) =>{
            if(err) throw err;
            cb(result);
        })
    }
}

module.exports = orm;