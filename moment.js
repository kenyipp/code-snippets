"use strict";
const moment = require("moment-timezone");
const humanizeDuration = require("humanize-duration");

// From ISO string to date
moment("2020-06-21T10:09:07.884Z").toDate();

// From MySql date to date
const row = /(\d{4}-\d{2}-\d{2})\s(\d{2}):(\d{2}):(\d{2})/.exec("2020-06-21 10:20:05");
moment(`${row[1]}T${row[2]}:${row[3]}:${row[4]}.000Z`).toDate();

// From timestamp to date
function calculateDates(start, end) {
	const now = moment().toDate();
	const timeGone = moment(now).diff(start);
	const timeLeft = moment(end).diff(now);
	const total = moment(end).diff(moment(start));
	const percentage = Math.round((timeGone / total + Number.EPSILON) * 100);
	return {
		start,
		now,
		end,
		timeGone,
		_timeGone: humanizeDuration(timeGone, { language: "zh_TW", delimiter: " " }),
		timeLeft,
		_timeLeft: humanizeDuration(timeLeft, { language: "zh_TW", delimiter: " " }),
		percentage,
		_percentage: percentage + "%"
	};
}

calculateDates(moment("21-06-2020", "DD-MM-YYYY").toDate(), moment("01-07-2020", "DD-MM-YYYY").toDate());

// Find all timezones for US
moment.tz.zonesForCountry("US");
moment().tz("America/Boise").format("lll");
moment().tz("America/Los_Angeles").format("lll");
moment().tz("Asia/Hong_Kong").format("lll");

// 各國鞋子尺寸對照表
// http://gadget.chienwen.net/x/table/shoes
// https://img.nike.com.hk/resources/sizecart/mens-shoe-sizing-chart.html
// https://www.yesstyle.com/zh_TW/%E9%9E%8B%E9%A1%9E%E5%B0%BA%E7%A2%BC/help/section.html/hsi.798
