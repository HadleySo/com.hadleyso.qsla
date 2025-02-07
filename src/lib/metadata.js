import sources from '$lib/metadata-config/sources.json';


export async function initialize() {

    let needLoadData = false;

    try {
        // Open the database
        const request = window.indexedDB.open(sources.dbName, sources.dbVersion);

        request.onerror = (event) => {
            console.error(`Unable to load IndexedDB - error: ${event.target.error?.message}`);
            throw new Error('Unable to load IndexedDB with event');
        };

        // Handle upgrade event
        request.onupgradeneeded =  function(event) {
            console.log("IndexedDB upgrade requested")

            // Save the IDBDatabase interface
            const db = event.target.result;


            // Create an objectStore for this database
            const objectStore = db.createObjectStore("qslCardMeta", { keyPath: "pk" });

            // Add indexes
            for (const column of sources.columns){
                objectStore.createIndex(column, column, { unique: false });
            }

            // Set flag to load data
            needLoadData = true;
            console.log("Done initializing");

        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            console.log("IndexedDB opened");
            var store = db.transaction(['qslCardMeta']).objectStore('qslCardMeta');
            var count = store.count();
            count.onsuccess = function() {
                console.log(`IndexedDB row count: ${count.result}`);
                if (count.result < 3000) {
                    needLoadData = true;
                }
            }

        };


    } catch(e) {
        throw new Error('Unable to load IndexedDB');
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    return needLoadData;
}

export async function loadData() {
    try {
        // Get columns to create indexes for
        const res = await fetch(sources.meta + "/cards-all-metadata.json");
        var items = await res.json();

    } catch(e) {
        console.error(e);
        throw new Error('Unable to load remote data');
    }

    try {
        // Request DB
        const request = window.indexedDB.open(sources.dbName, sources.dbVersion);
        
        // Handle errors
        request.onerror = (event) => {
            console.error(`Unable to load IndexedDB - error: ${event.target.error?.message}`);
            throw new Error('Unable to load IndexedDB with event');
        };

        // Handle upgrade event
        request.onupgradeneeded =  function(event) {
            console.error(`Unable to load IndexedDB - UPGRADE needed`);
            throw new Error('Unable to load IndexedDB - UPGRADE needed');
        };

        request.onsuccess = (event) => {
            const db = event.target.result;


            // Open transaction
            const transaction = db.transaction(["qslCardMeta"], "readwrite");

            // Do something when all the data is added to the database.
            transaction.oncomplete = (event) => {
                console.log(`All data loaded - ${event}`);
            };
        
            transaction.onerror = (event) => {
                throw new Error('Transaction readwrite error');
            };
        
            // Create object store on transaction
            const objectStore = transaction.objectStore("qslCardMeta");


            // Iterate through items
            items.forEach((item) => {
                item.date_utc = Date.parse(item.date_utc); 
                item.frequency = parseFloat(item.frequency); 
                item.rst = Number(item.rst); 
                const request = objectStore.add(item);
                request.onerror = (event) => {
                    console.error(event)
                    throw new Error('objectStore add error');
                };
            });


        };

    } catch(e) {
        console.error(e);
        throw new Error('IndexedDb unable to load data');
    }
  
}

export async function resetDb() {

    return new Promise(function(resolve, reject) {

        const DBDeleteRequest = window.indexedDB.deleteDatabase(sources.dbName);

        DBDeleteRequest.onerror = (event) => {
            console.error("Error deleting database.");
            reject("Error deleting database");
        };

        DBDeleteRequest.onsuccess = (event) => {
            console.log("Database deleted successfully");
            resolve("Database deleted successfully");
        };
    });

}