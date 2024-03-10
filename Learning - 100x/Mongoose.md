This Text file contain all the Necessary Code snippet Related to MongoDB

## Code to Define a model
  ```javascript
    const mongoose = require('mongoose')
    
    const todoSchema = mongoose.Schema({
        id : {
          type : String,
          required : true
        },
        title : {
          type : String,
        },
        description : {
          type : String,
        },
        isDone : {
          type : Boolean,
          default : false
        }
    })
    
    const todo = mongoose.model('todos',todoSchema)
    module.exports = todo
  ```
## Code to Connect to Mongoose
  ```javascript
    const mongoose = require('mongoose')
    const connectionString = ""
    
    mongoose.connect(connectionString)
    mongoose.connection.on('connected',() => {
        console.log('Connected To mongoDB')
    })
    mongoose.connection.on('disconnected',() => {
      console.log('Disconected to Mongoose')
    })
    mongoose.connection.on('error', (err) => {
      console.log('Error Connecting to MongoDB',err)
    })
  ```
## code to get the data from DB
  ```javascript
    const todoDataGet = require("../src/models/todomodel.cjs")
    app.get("/todo",async (req,res) => {
      try{
        const todoss = await todoDataGet.find()
        res.send(todoss)
      }catch(error){
          res.status(500).json({
            Message : "Unable To Fetch Todos Boss"
          })
      }
    })
  ```
## code to put the data coming from request body/header etc

  ```javascript
    app.post("/todo",(req,res) => {
        const todoBody = req.body; 
        const todoBodyCreate = new todoDataGet({
          ...todoBody
        }) 
        todoBodyCreate.save().then((err)=>{
            console.log(err)
        })
        res.send(todoBody)
    })
  ```

## code to delete the data from the DB Based on custom ID
  ```javascript
    app.delete("/todo/:id", async (req, res) => {
      const id = req.params.id;
      try {
          const deletedTodo = await todoDataGet.findOneAndDelete({ id: id });
          if (!deletedTodo) {
              res.status(404).json({
                  message: "Todo not found"
              });
          } else {
              res.json({
                  message: "Todo deleted",
                  deleted: deletedTodo
              });
          }
      } catch (error) {
          res.status(500).json({
              message: "Error deleting todo"
          });
      }
    });

    Here is the Postman API : http://localhost:3001/todo/3
    Here is the Data  Saved in DB : 
    {
        "_id": {
          "$oid": "65e5e83215ceb42dc59fb736"
        },
        "id": "3",
        "title": "Vatican City",
        "description": "Hi All are not  ",
        "isDone": true,
        "__v": 0
    } 

    Here is the response Body
    {
        "message": "Todo deleted",
        "deleted": {
            "_id": "65e5e83215ceb42dc59fb736",
            "id": "3",
            "title": "Vatican City",
            "description": "Hi All are not  ",
            "isDone": true,
            "__v": 0
        }
    } 
  ```
## Code to delete any Todo using delete Button IN FRONTEND

    Ye top me rhega
  ```javascript
      const onDeleteID = (id) => {
        fetch(`http://100.93.3.137:3001/todo/${id}`,{
          method : 'DELETE'
        })
          .then((response) => response.json())
          .then(()=>{
            setTodos(todos.filter((item)=> item.id !== id))
          })
    };
    <Todo
      id={x.id}
      title={x.title}
      description={x.description}
      isDone={x.isDone}
      onDelete={ () => onDeleteID(x.id) }
    ></Todo>

    <button onClick={props.onDelete}> Delete </button>
  ```

## All the possible find methods in mongoose

    In Mongoose, there are several `find` methods you can use to query documents in a MongoDB collection. Here are the most common ones:

1. **Model.find():** Finds all documents that match the query criteria.
   ```javascript
   const courses = await Course.find({ category: 'Web Development' });
   ```

2. **Model.findOne():** Finds the first document that matches the query criteria.
   ```javascript
   const course = await Course.findOne({ courseID: 'C001' });
   ```

3. **Model.findById():** Finds a single document by its ID.
   ```javascript
   const course = await Course.findById('1234567890');
   ```

4. **Model.findByIdAndDelete():** Finds a document by its ID and deletes it.
   ```javascript
   const deletedCourse = await Course.findByIdAndDelete('1234567890');
   ```

5. **Model.findByIdAndRemove():** Finds a document by its ID and removes it.
   ```javascript
   const removedCourse = await Course.findByIdAndRemove('1234567890');
   ```

6. **Model.findOneAndUpdate():** Finds a document that matches the query criteria and updates it.
   ```javascript
   const updatedCourse = await Course.findOneAndUpdate({ courseID: 'C001' }, { $set: { courseTitle: 'New Title' } }, { new: true });
   ```

7. **Model.findOneAndDelete():** Finds a document that matches the query criteria and deletes it.
   ```javascript
   const deletedCourse = await Course.findOneAndDelete({ courseID: 'C001' });
   ```

8. **Model.findOneAndRemove():** Finds a document that matches the query criteria and removes it.
   ```javascript
   const removedCourse = await Course.findOneAndRemove({ courseID: 'C001' });
   ```

9. **Model.find().sort():** Finds all documents and sorts them based on the specified criteria.
   ```javascript
   const courses = await Course.find().sort({ coursePrice: -1 });
   ```

10. **Model.find().limit():** Finds all documents but limits the number of documents returned.
    ```javascript
    const courses = await Course.find().limit(10);
    ```

These are some of the common `find` methods in Mongoose. The actual method you use depends on your specific use case and the query you need to perform.




## Commands to remember
1. git add . ; git commit -a -m "commit" ; git push
2. npm run dev -- --host 100.93.3.137