module.exports = app => {
    const indiciosRepository = app.repositories.indicios;

    return {
        randomIndicios: async () => {
            let { rows } = await indiciosRepository.findAll();
            return rows;
        },
    }
}

// const _getRandom = (arr, n) => {
//     var result = new Array(n),
//         len = arr.length,
//         taken = new Array(len);
//     if (n > len)
//         throw new RangeError("getRandom: more elements taken than available");
//     while (n--) {
//         var x = Math.floor(Math.random() * len);
//         result[n] = arr[x in taken ? taken[x] : x];
//         taken[x] = --len in taken ? taken[len] : len;
//     }
//     return result;
// }