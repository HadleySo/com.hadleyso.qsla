import { goto } from '$app/navigation';
import sources from '$lib/metadata-config/sources.json';

/**
 * Takes in raw search form parameters and returns pks with overlap.
 *
 * Using raw search form parameters, iterate though each input, 
 * skipping empty parameters. Returns all pks that match. For multiselect
 * returns pks for all selected, not a union of.
 *
 * @param {any} from_call
 * @param {any} to_call
 * @param {any} frequency
 * @param {any} rst
 * @param {any} freeContent
 * @param {any} country
 * @param {any} mode
 * @param {any} us_canada_region
 * @param {any} ussr_region
 * @param {any} date_utc_start
 * @param {any} date_utc_end
 *
 * @return {Promise<any>} pks of search results.
 */
export async function searchFullInputKeys(from_call, to_call, frequency, rst, freeContent, country, mode, us_canada_region, ussr_region, date_utc_start, date_utc_end) {

    console.debug(`searchFullInputKeys started: ${from_call} ${to_call} ${frequency} ${rst} ${freeContent} ${country} ${mode} ${us_canada_region} ${ussr_region} ${date_utc_start} ${date_utc_end}`);

    let searchStrings = {
        'from_call': from_call,
        'to_call': to_call, 
        'frequency': parseFloat(frequency),
        'rst': Number(rst),
        'freeContent': freeContent
    };
    let searchSelects = {
        'country': country, 
        'mode': mode, 
        'us_canada_region': us_canada_region, 
        'ussr_region': ussr_region
    }

    if (date_utc_start) {
        date_utc_start = Date.parse(date_utc_start);
    }
    if (date_utc_end) {
        date_utc_end = Date.parse(date_utc_end);
    }

    // CLEAN UP DICT AND REMOVE EMPTY
    for (const [key, value] of Object.entries(searchStrings)) {
        if (!value) {
            // @ts-ignore
            delete searchStrings[key];
        }
    }
    for (const [key, value] of Object.entries(searchSelects)) {
        if (value.length == 0) {
            // @ts-ignore
            delete searchSelects[key];
        }
    }


    /**
     * @type {any[][]}
     */
    var searchKeyResults = [];
    

    return new Promise(function(resolve, reject) {
        try {
            // Request DB
            const request = window.indexedDB.open(sources.dbName, sources.dbVersion);
            
            // Handle errors
            request.onerror = (event) => {
                // @ts-ignore
                console.error(`Unable to load IndexedDB - error: ${event.target.error?.message}`);
                reject("Unable to load IndexedDB with event");
                throw new Error('Unable to load IndexedDB with event');
            };
    
            // Handle upgrade event
            request.onupgradeneeded =  function(event) {
                console.error(`Unable to load IndexedDB - UPGRADE needed`);
                reject("Unable to load IndexedDB - UPGRADE needed");
                throw new Error('Unable to load IndexedDB - UPGRADE needed');
            };
    
            request.onsuccess = (event) => {
                // @ts-ignore
                const db = event.target.result;
    
    
                const transaction = db.transaction(["qslCardMeta"], "readonly");
                const objectStore = transaction.objectStore("qslCardMeta");

                // CHECK THAT DB HAS CONTENT
                var count = objectStore.count();
                count.onsuccess = function() {
                    console.log(`IndexedDB row count: ${count.result}`);
                    if (count.result < 3000) {
                        goto("/initialize-client?reset")
                    }
                }
    
                // CATCH PROMISE WHEN TRANSACTION DONE
                transaction.addEventListener("complete", (event) => {
                    console.info(`searchFullInputKeys transaction was completed ${searchKeyResults} ${event}`);
                    resolve(searchKeyResults);
                });
                
                // SEARCH INPUT STRING VALUES
                // SAVE PRIMARY KEYS FOUND
                for (var [key, value] of Object.entries(searchStrings)) {
                    /**
                     * @type {any[]}
                     */
                    var tempListKeys = [];
    
                    const readIndex = objectStore.index(key);
                    const fromCallRange = IDBKeyRange.only(value);
    
                    console.debug(`RangeValue ${value} - next starting cursor`);
                    readIndex.openKeyCursor(fromCallRange).onsuccess = (event) => {
                        const cursor = event.target.result;
                        if (cursor) {
                            tempListKeys.push(cursor.primaryKey);
                            console.debug(`RangeValue cursor found entry: ${cursor.primaryKey} `);
                            cursor.continue();
                        } else {
                            searchKeyResults.push(tempListKeys);
                            tempListKeys = [];
                            console.debug(`Pushing to searchKeyResults ${tempListKeys}`);
                        }
                    };
                    
                } 
    
    
                // SEARCH INPUT SELECT VALUES
                // SAVE PRIMARY KEYS FOUND
                for (var [key, value] of Object.entries(searchSelects)) {
                    /**
                     * @type {any[]}
                     */
                    var tempListKeys = [];
                    console.debug(`Select search values: ${value}`);
    
                    for (var selectItem of value) {
                        console.debug(`selectItem ${selectItem}`);
                        const readIndex = objectStore.index(key);
                        const fromCallRange = IDBKeyRange.only(selectItem);
    
                        console.debug(`SearchSelect selectItem ${selectItem} - next starting cursor`);
    
                        readIndex.openKeyCursor(fromCallRange).onsuccess = (event) => {
                            const cursor = event.target.result;
                            if (cursor) {
                                tempListKeys.push(cursor.primaryKey);
                                console.debug(`SearchSelect selectItem cursor found entry: ${cursor.primaryKey} `);
                                cursor.continue();
                            } else {
                                searchKeyResults.push(tempListKeys);
                                tempListKeys = [];
                                console.debug(`Pushing to searchKeyResults ${tempListKeys}`);
                            }
                        };
    
                    }
                    
                } 

                // SEARCH INPUT DATE VALUES
                // SAVE PRIMARY KEYS FOUND
                if (date_utc_start && date_utc_end) {
                    /**
                     * @type {any[]}
                     */
                    var tempListKeys = [];
    
                    const readIndex = objectStore.index("date_utc");
                    const fromCallRange = IDBKeyRange.bound(date_utc_start, date_utc_end);
    
                    console.debug(`RangeValue date_utc - next starting cursor`);
                    readIndex.openKeyCursor(fromCallRange).onsuccess = (event) => {
                        const cursor = event.target.result;
                        if (cursor) {
                            tempListKeys.push(cursor.primaryKey);
                            console.debug(`RangeValue cursor found entry: ${cursor.primaryKey} `);
                            cursor.continue();
                        } else {
                            searchKeyResults.push(tempListKeys);
                            tempListKeys = [];
                            console.debug(`Pushing to searchKeyResults ${tempListKeys}`);
                        }
                    };
                    
                } 
        
    
            };
    
    
    
        } catch(e) {
            console.error(e);
            reject(`IndexedDb unable to load data - ${e}`);
            throw new Error('IndexedDb unable to load data');
        }
    
    });


}

function intersection() {
    var result = [];
    var lists;

    console.info(`intersection() running`);
  
    if(arguments.length === 1) {
      lists = arguments[0];
    } else {
      lists = arguments;
    }
  
    for(var i = 0; i < lists.length; i++) {

    var currentList = lists[i];
      for(var y = 0; y < currentList.length; y++) {
          var currentValue = currentList[y];
        if(result.indexOf(currentValue) === -1) {
          var existsInAll = true;
          for(var x = 0; x < lists.length; x++) {
            if(lists[x].indexOf(currentValue) === -1) {
              existsInAll = false;
              break;
            }
          }
          if(existsInAll) {
            result.push(currentValue);
          }
        }
      }
    }
    return result;
} 

/**
 * Handle search form.
 *
 * Using raw search form parameters, call helper functions.
 * 
 * @param {string} from_call
 * @param {string} to_call
 * @param {string} frequency
 * @param {string} rst
 * @param {string} freeContent
 * @param {never[]} country
 * @param {never[]} mode
 * @param {never[]} us_canada_region
 * @param {never[]} ussr_region
 * @param {string} date_utc_start
 * @param {string} date_utc_end
 */
export async function searchFormWrap(from_call, to_call, frequency, rst, freeContent, country, mode, us_canada_region, ussr_region, date_utc_start, date_utc_end) {

    const value = await searchFullInputKeys(from_call, to_call, frequency, rst, freeContent, country, mode, us_canada_region, ussr_region, date_utc_start, date_utc_end);
    let v = intersection(value);

    console.debug(`Search pk results: ${v}`);    

    let cardData = multiURN(v);

    await new Promise(resolve => setTimeout(resolve, 1000));
    return cardData;
}

/**
 * Takes in array primary keys and returns full info.
 *
 *  * @param {Array<any} pks
 */
export async function multiURN(pks) {

    /**
     * @type {never[]}
     */
    var cardData = [];
    var tableId = 1;
    return new Promise(function(resolve, reject) {
        try {
            // Request DB
            const request = window.indexedDB.open(sources.dbName, sources.dbVersion);
            
            // Handle errors
            request.onerror = (event) => {
                // @ts-ignore
                console.error(`Unable to load IndexedDB - error: ${event.target.error?.message}`);
                reject("Unable to load IndexedDB with event");
                throw new Error('Unable to load IndexedDB with event');
            };
    
            // Handle upgrade event
            request.onupgradeneeded =  function(event) {
                console.error(`Unable to load IndexedDB - UPGRADE needed`);
                reject("Unable to load IndexedDB - UPGRADE needed");
                throw new Error('Unable to load IndexedDB - UPGRADE needed');
            };
    
            request.onsuccess = (event) => {
                // @ts-ignore
                const db = event.target.result;
    
                const transaction = db.transaction(["qslCardMeta"], "readonly");
                const objectStore = transaction.objectStore("qslCardMeta");
    
                // CATCH PROMISE WHEN TRANSACTION DONE
                transaction.addEventListener("complete", () => {
                    console.info(`multiURN transaction was completed ${cardData}`);
                    resolve(cardData);
                });
                
                // 
                // SEARCH INPUT STRING VALUES
                // SAVE PRIMARY KEYS FOUND
                for (var key of pks) {
                    /**
                     * @type {any[]}
                     */
                    const requestObj = objectStore.get(Number(key));
                    requestObj.onerror = () => {
                        // Handle errors!
                        console.error(`Unable to retrieve pk ${key}`);
                        reject(`Unable to retrieve pk ${key}`);
                        throw new Error('Unable to retrieve pk ${key}');
                    };
                    requestObj.onsuccess = () => {
                        
                        if (typeof requestObj.result == 'undefined') {
                            console.error(`requestObj.result is undefined, even in requestObj.onsuccess`);
                            reject(`requestObj.result is undefined, even in requestObj.onsuccess`);
                            throw new Error('requestObj.result is undefined, even in requestObj.onsuccess');
                        }

                        // @ts-ignore
                        requestObj.result.id = tableId;

                        var date_int = new Date(requestObj.result.date_utc);
                        requestObj.result.date_utc = date_int.toLocaleDateString('en-GB', {year: 'numeric', month: 'short', day: '2-digit'});

                        cardData.push(requestObj.result);
                        tableId++;
                    };

    
                    
                } 

        
    
            };
    
    
    
        } catch(e) {
            console.error(e);
            reject(`IndexedDb unable to load data - ${e}`);
            throw new Error('IndexedDb unable to load data');
        }
    
    });

}
