module.exports = {
    toggle: function (featureEnabled, args)
    {
        if (args != 'false' && args != 'true') {
            return !featureEnabled;
        }
        return JSON.parse(args);
    },

    insertionSort: function(arr, word){
        const n = arr.length;
        // Iteration of array till last element 
        for (i = 0; i < n; i++) {
        let j = i;
        // Iterate over the sorted part of array and insert the element
        while (j >= 0 && arr[j] > arr[j - 1]) {
            let temp = arr[j];
            let tempW = word[j];
            arr[j] = arr[j - 1];
            word[j] = word[j - 1];
            arr[j - 1] = temp;
            word[j - 1] = tempW;
            j--;
            } 
        }
    return {arr, word};
    }
}