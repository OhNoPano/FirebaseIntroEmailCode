// this function is show student database entry input boxes
// and buttons IF a user is loggedIn

// if the user is NOT logged in, then they are hidden

function hideShowStudentData(loggedIn) {
   var x = document.getElementById("studentDataDiv");
   if (loggedIn) {
     x.style.display = "block";
   } else {
     x.style.display = "none";
   }
 }

var nameV, idV, ageV, yearV;    // values of the input boxes in the HTML
 
function ready() {
   nameV = document.getElementById('name').value;
   idV = document.getElementById('idNum').value;
   ageV = document.getElementById('age').value;
   yearV = document.getElementById('year').value;
}

// INSERT FUNCTIONALITY - ONCLICK
// Adding an element to the database. In firebase, a database
// is called a collection, and each object we add to it is called
// a document. In the case of this project, my collection is named student.
 
document.getElementById('insert').onclick = () => {
   ready();
   
	// notice similar style of syntax for the object we are adding
	// to the collection.
   db.collection('student').add({
       nameOfStudent: nameV,
       idNum: idV,
       age: ageV,
       year: yearV
   }).catch(e => console.log(e.message));
}
// SEARCH/SHOW DATA FUNCTIONALITY - ONCLICK
 /*
 the two queries are searching for any documents in the database where
 the id Num mathces what was typed in the id box OR the other query searched
 for any documents where name matches what was typed in the name box
 
 assumptions - assuming id and name are unique, if NOT unique would return more
 than one document
 
 .where() performs the query and .get() gets the results
The results are stored in a snapshot, which is the current contents of 0 to 
many documents in this snapshot. We can use a forEach loop to cycle through all
the documents in the snapshot.

in code, included console.log statements so you can see what these
valuse look like when they come back from the snapshot 
 
 
 */
 
document.getElementById('showData').onclick = () => {
   ready();
   console.log(idV + " " + nameV + " " + ageV + " " + yearV);
   db.collection('student').where("idNum", '==', idV).get().then((snapshot) => {
       snapshot.forEach((doc) => {
           console.log(doc.id, " => ", doc.data());
           console.log(doc.data().idNum);
           document.getElementById('name').value = doc.data().nameOfStudent;
           document.getElementById('idNum').value = doc.data().idNum;
           document.getElementById('age').value = doc.data().age;
           document.getElementById('year').value = doc.data().year;
       });
   }).catch((e) => {
       console.log("Error getting student by ID number: ", e.message);
   });
 
   db.collection('student').where("nameOfStudent", '==', nameV).get().then((snapshot) => {
       snapshot.forEach((doc) => {
           console.log(doc.id, " => ", doc.data());
           console.log(doc.data().idNum);
           document.getElementById('name').value = doc.data().nameOfStudent;
           document.getElementById('idNum').value = doc.data().idNum;
           document.getElementById('age').value = doc.data().age;
           document.getElementById('year').value = doc.data().year;
       });
   }).catch((e) => {
       console.log("Error getting student by name: ", e.message);
   });
};

// UPDATE FUNCTIONALITY - ONCLICK
 
document.getElementById('update').onclick = () => {
   ready();
   console.log(idV + " " + nameV + " " + ageV + " " + yearV);
   db.collection('student').where("idNum", '==', idV).get().then((snapshot) => {
       snapshot.forEach((doc) => {
           console.log(doc.id, " => ", doc.data());
           // gets UID so we can locate the document to update it in collection
           const updateID = doc.id;
 
           // if any of these fields are empty, we then keep old value
           if (nameV == undefined) {
               nameV = doc.data().nameOfStudent;
           }
           if (ageV == undefined) {
               ageV = doc.data().age;
           }
           if (yearV == undefined) {
               yearV = doc.data().year;
           }
 
           // sets new value to this existing student record.  Update will only
           // change the values we ask it to change. 
           db.collection('student').doc(updateID).update({
               nameOfStudent: nameV,
               age: ageV,
               year: yearV
           }).then(() => {
               console.log("Updated, new data:");
           }).catch(e => console.log(e.message));
       });
   });
};
 
// DELETE FUNCTIONALITY - ONCLICK
document.getElementById('delete').onclick = () => {
   ready();
   db.collection('student').where("idNum", '==', idV).get().then((snapshot) => {
       snapshot.forEach((doc) => {
           console.log(doc.id, " => ", doc.data());
           // gets UID so we can locate the document to delete it in collection
           const updateID = doc.id;
           db.collection('student').doc(updateID).delete().then(() => {
               console.log("Deleted data");
           }).catch(e => console.log(e.message));
       });
   });
}
