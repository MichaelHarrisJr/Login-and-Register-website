const ref = firebase.firestore().collection('content');

ref.onSnapshot(snapshot =>{
    
    let content = [];
    snapshot.forEach(doc=> {
        content.push({...doc.data(), id: doc.id})
    });
    console.log(content);
})