/**
 * 1、
 * 给定一个数组 a，包含 n 个整数
 * 再给定一个整数 k，可以给数组中任意整数加 1，总共可以加 k 次
 * 加完 k 次后，找到数组中的最大值。最后要求得一个最小的最大值
 *
 **/

export function minMaxArr(arr: number[], k: number): number {
	let sum: number = 0;
	let arrMax = maxArr(arr);
	for (let i = 0; i < arr.length; i++) {
		sum += arrMax - arr[i];
	}
	if (k <= sum) {
		return k;
	} else {
		let maxNumber = (k - sum) / arr.length + arrMax;
		return maxNumber;
	}
}

/**
 * 查找数组中的最大值
 *
 **/
export function maxArr(arr: number[]): number {
	let max: number = arr[0];
	for (let i = 0; i < arr.length - 1; i++) {
		max = max < arr[i + 1] ? arr[i + 1] : max;
	}
	return max;
}

/**
 * 查找数组中的最小值
 *
 **/
export function minArr(arr: number[]): number {
	let min: number = arr[0];
	for (let i = 0; i < arr.length - 1; i++) {
		min = min > arr[i + 1] ? arr[i + 1] : min;
	}
	return min;
}

/***
 * 魔术索引。
 * 有序整数数组........
 * 在数组A[0...n-1]中，有所谓的魔术索引，满足条件A[i] = i。给定一个有序整数数组，编写一种方法找 * 出魔术索 * 引，若有的话，在数组A中找出一个魔术索引，如果没有，则返回-1。若有多个魔术索引，返回索引值最小的一 * 个。
 */

export function findMagicIndex(nums: number[]): number {
	for (let i = 0; i < nums.length; ) {
		if (nums[i] == i) {
			return i;
		} else {
			i = Math.max(nums[i], i + 1);
		}
	}
	return -1;
}

/**
 *
 * 输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1 * 个节点。
 * 例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值 * 为 4 的节点。
 * 给定一个链表: 1->2->3->4->5, 和 k = 2 返回链表 4->5.
 *
 */

class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}

export function getKthFromEnd(
	head: ListNode | null,
	k: number
): ListNode | null {
	if (k <= 0 || !head || !k) return null;
	let fast = head;
	let show: any = head;
	for (let i = 0; i < k - 1; i++) {
		if (fast.next) {
			fast = fast.next;
		} else {
			return null;
		}
	}

	while (fast.next) {
		fast = fast.next;
		show = show.next;
	}

	return show;
}

/**
 *
 * 给定一个整数数组 nums 和一个整数目标值 target，
 * 请你在该数组中找出 和为目标值 target  的那 两个 整数，并* 返回它们的数组下标。
 * 例：
 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[0,1]
 * 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
 */

export function twoSum(nums: number[], target: number): number[] {
	let callback: number[] = [];
	for (let i = 0; i < nums.length - 1; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			if (nums[i] + nums[j] == target) {
				callback[0] = i;
				callback[1] = j;
			}
		}
	}
	return callback;
}
