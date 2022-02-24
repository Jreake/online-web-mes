/**
 * 全排列
 * 从n个不同元素中任取m（m≤n）个元素，按照一定的顺序排列起来，
 * 叫做从n个不同元素中取出m个元素的一个排列。
 * 当m=n时所有的排列情况叫全排列。
 */
function permutate(str) {
	var array = str.split("");
	function loop(array, pre = []) {
		if (array.length == 1) {
			return [pre.concat(array).join("")];
		}
		let res = [];
		for (let i = 0; i < array.length; i++) {
			var first = array.pop();
			res = res.concat(loop(array, [...pre, first]));
			array.unshift(first);
		}
		return res;
	}
	return Array.from(new Set(loop(array)));
}

/**
 * 二分搜索
 */

function BinarySearch(arr, target) {
	return search(arr, target, 0, arr.length - 1);
	function search(arr, target, from, to) {
		if (from > to) {
			return -1;
		}
		const mid = Math.floor((from + to) / 2);
		if (arr[mid] > target) {
			return search(arr, target, from, mid - 1);
		} else if (arr[mid] < target) {
			return search(arr, target, mid + 1, to);
		} else {
			return mid;
		}
	}
}

/**
 * 冒泡排序
 * 按照从大到小/从小到大排序，比较相邻的两位
 */
function BubbleSor(arr) {
	const length = arr.length;
	for (let i = 0; i < length; i++) {
		for (let j = 0; j < length - i; j++) {
			if (arr[j] < arr[j - 1]) {
				const temp = arr[j];
				arr[j] = arr[j - 1];
				arr[j - 1] = temp;
			}
		}
	}
	return arr;
}

/**
 * 快速排序
 *根据中间值把左右两个测分成两组数据，左小右大，再左右两侧找中间值再分，重复操作
 */
function QuickSort(arr, low, high) {
	let left = low;
	let right = high;
	let basic = arr[low];
	while (left < right) {
		while (left < right && arr[right] > basic) {
			right--;
		}
		while (left < right && arr[left] <= basic) {
			left++;
		}
		if (left < right) {
			const temp = arr[left];
			arr[left] = arr[right];
			arr[right] = temp;
		} else {
			const temp = arr[low];
			arr[low] = arr[left];
			arr[left] = temp;
			QuickSort(arr, low, left - 1);
			QuickSort(arr, right + 1, high);
		}
	}
	return arr;
}

/**
 * 选择排序
 *是给每个位置选择当前元素最小的元素，以此类推
 */

function SelectionSort(arr) {
	const length = arr.length;
	for (let i = 0; i < length; i++) {
		let minIndex = i;
		for (let j = i + 1; j < length; j++) {
			minIndex = arr[minIndex] < arr[j] ? minIndex : j;
		}
		if (minIndex !== j) {
			const temp = arr[i];
			arr[i] = arr[minIndex];
			arr[minIndex] = temp;
		}
	}
	return arr;
}

/**
 * 插入排序
 * 首先拿出第一个元素位有序列表，再无序列表中取下一个元素和有序元素的第一个比较插入
 */

function InsertSort(arr) {
	const length = arr.length;
	for (let i = 1; i < length; i++) {
		const temp = arr[i];
		for (let j = i - 1; j >= 0 && temp < arr[j]; j--) {
			arr[j + 1] = arr[j];
		}
		arr[j + 1] = temp;
	}
	return arr;
}

/**
 * 希尔排序
 * 1、计算数组增量  arr.length/2
 * 2、根据增量找出对应各组数据
 * 3、每组数据的最小值一次拿出排序等到最新数组
 * 4、以此类推，一直到增量为1，将会全排序
 */
function ShellSort(arr) {
	const length = arr.length;
	// 计算增量
	let gap = Math.floor(length);
	while (gap) {
		for (let i = gap; i < length; i++) {
			const temp = arr[i];
			for (let j = i - gap; j >= 0 && temp < arr[j]; j = j - gap) {
				arr[j + gap] = arr[j];
			}
			arr[j + gap] = temp;
		}
		gap = Math.floor(gap / 2);
	}
	return arr;
}

/**
 * 归并排序
 *
 */
function MargeSort(arr, low, high) {
	const length = arr.length;
	if (low === high) {
		return arr[low];
	}

	const mid = Math.floor((low + high) / 2);
	MargeSort(arr, low, high);
	MargeSort(arr, mid + 1, high);
	marge(arr, low, high);
	return arr;
}
function marge(arr, low, high) {
	const mid = Math.floor((low + high) / 2);
	let left = low;
	let right = mid + 1;
	const result = [];
	while (left <= mid && right <= high) {
		if (arr[left] <= arr[right]) {
			result.push(arr[left++]);
		} else {
			result.push(arr[right++]);
		}
	}
	while (left <= mid) {
		result.push(arr[left++]);
	}
	while (right <= high) {
		result.push(arr[right++]);
	}
	arr.splice(low, high - low + 1, ...result);
}

// const test = [2, 34, 452,3,5, 785, 32, 345, 567, 322,5]

// console.log(MergeSort(test, 0, test.length - 1))

/**
 * 堆排序
 *
 */
function HeapSort(arr) {
	const length = arr.length;
	// 调整初始堆，调整完也确定了最大值
	// 但此时最大值实在arr[0]中
	for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
		adjustHeap(arr, i, length);
	}

	// 把arr[0]最大值换到最后面
	for (let i = length - 1; i >= 0; i--) {
		const temp = arr[0];
		arr[0] = arr[i];
		arr[i] = temp;
		adjustHeap(arr, 0, i);
	}
	return arr;
}

// size还是需要调整堆的大小
// 随着一个个最大值的确定，size会越来越小
// function adjustHeap(arr, position, size) {
// 	const left = position * 2 + 1;
// 	const right = left + 1;
// 	let maxIndex = left + 1;
// 	let maxIndex = position;
// 	if (left < size && arr[left] > arr[maxIndex]) {
// 		maxIndex = left;
// 	}
// 	if (right < size && arr[right] > arr[maxIndex]) {
// 		maxIndex = right;
// 	}
// 	if (maxIndex !== position) {
// 		const temp = arr[position];
// 		arr[position] = arr[maxIndex];
// 		arr[maxIndex] = temp;
// 		adjustHeap(arr, maxIndex, size);
// 	}
// 	return arr;
// }
