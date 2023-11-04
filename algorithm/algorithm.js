// Mini-Max Sum
// Given five positive integers, find the minimum and maximum values that can be calculated by summing
// exactly four of the five integers. Then print the respective minimum and maximum values as a single line
// of two space-separated long integers.
// For example arr = [1, 3, 5, 7, 9], . Our minimum sum is 1 + 3 + 5 + 7 = 16
//and our maximum sum is 3 + 5 + 7 + 9 = 24
// We would print
// 16 24
//================================================================
// ==> ý tưởng giải bài toán: Tìm ra tổng của tất cả các số, sau đó lấy tổng trừ đi số nhỏ nhất để tìm Max, và trừ đi số lớn nhất để tìm Min. Ở đây em dùng thêm thư viện BigInt của JS để có thể tính được cho số nguyên lớn hơn 32bit.
function miniMaxSum(arr) {
  let sum = 0n; // Sử dụng BigInt bằng cách thêm "n" sau giá trị
  let minNum = BigInt(Number.MAX_SAFE_INTEGER); //9007199254740991
  let maxNum = BigInt(Number.MIN_SAFE_INTEGER); //-9007199254740991

  for (let num of arr) {
    sum += BigInt(num);

    if (BigInt(num) < minNum) {
      minNum = BigInt(num);
    }

    if (BigInt(num) > maxNum) {
      maxNum = BigInt(num);
    }
  }

  let minSum = sum - maxNum; //Min = Tổng - Max
  let maxSum = sum - minNum; //Max = Tổng - Min

  console.log(minSum.toString(), maxSum.toString()); //chuyển sang chuỗi để có thể biểu diễn hết độ dài
}
//bonus: tìm những số chẵn và lẻ trong mảng
// ==> ý tưởng: Tìm ra số chẵn và lẻ dựa vào phép chia lấy dư (mod) sau đó dùng hàm filter để lọc ra danh sách những số chẵn và lẻ
function findEvenAndOddNumbers(arr) {
  const evenNumbers = arr.filter((number) => number % 2 === 0);
  const oddNumbers = arr.filter((number) => number % 2 !== 0);
  console.log("Số chẵn: " + evenNumbers);
  console.log("Số lẻ: " + oddNumbers);
}

// Test case 1
const arr = [1, 3, 5, 7, 9];
miniMaxSum(arr); //out put: 10 14
findEvenAndOddNumbers(arr);
//out put:
//Số chẵn:
//Số lẻ: 1,3,5,7,9
//=================
// Test case 2
const arr1 = [
  4294967295533444, 4294967295634545, 4294967295735646, 4294967295836747,
  4294967295937848,
];
miniMaxSum(arr1); //out put:17179869182740382  17179869183144786
findEvenAndOddNumbers(arr1);
//out put:
//Số chẵn: 4294967295533444,4294967295735646,4294967295937848
//Số lẻ: 4294967295634545,4294967295836747
