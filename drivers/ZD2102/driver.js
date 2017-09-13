'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.pepper1.net/zwavedb/device/702
// http://www.pepper1.net/zwavedb/device/988

module.exports = new ZwaveDriver(path.basename(__dirname), {
	debug: false,
	capabilities: {
		alarm_contact: [
			{
				command_class: 'COMMAND_CLASS_SENSOR_BINARY',
				command_get: 'SENSOR_BINARY_GET',
				command_report: 'SENSOR_BINARY_REPORT',
				command_report_parser: report => report['Sensor Value'] === 'detected an event',
			},
			{
				command_class: 'COMMAND_CLASS_BASIC',
				command_report: 'BASIC_SET',
				command_report_parser: report => report.Value === 255,
			},
		],
		
		alarm_tamper: {
			command_class: 'COMMAND_CLASS_SENSOR_ALARM',
			command_get: 'SENSOR_ALARM_GET',
			command_get_parser: () => ({
				'Sensor Type': 'General Purpose Alarm',
			}),
			command_report: 'SENSOR_ALARM_REPORT',
			command_report_parser: report => {
				if (report && report.hasOwnProperty('Sensor State')) return report['Sensor State'] === 'alarm';
				return null;
			}
		},

		measure_battery: {
			getOnWakeUp: true,
			command_class: 'COMMAND_CLASS_BATTERY',
			command_get: 'BATTERY_GET',
			command_report: 'BATTERY_REPORT',
			command_report_parser: report => {
				if (report['Battery Level'] === 'battery low warning') return 1;

				if (report.hasOwnProperty('Battery Level (Raw)')) { return report['Battery Level (Raw)'][0]; }

				return null;
			},
		},
	},

	settings: {
		Enable_External_Switch: {
			index: 1,
			size: 1,
		}
	},
});
