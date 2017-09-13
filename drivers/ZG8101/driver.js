'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.pepper1.net/zwavedb/device/430

module.exports = new ZwaveDriver( path.basename(__dirname), {
	debug: false,
	capabilities: {
		'alarm_contact': [
			{
				'command_class': 'COMMAND_CLASS_SENSOR_BINARY',
				'command_get': 'SENSOR_BINARY_GET',
				'command_report': 'SENSOR_BINARY_REPORT',
				'command_report_parser': report => report['Sensor Value'] === 'detected an event'
			},
			{
				'command_class': 'COMMAND_CLASS_BASIC',
				'command_report': 'BASIC_SET',
				'command_report_parser': report => report['Value'] === 255
			}
		],
		
		'measure_battery': {
			'command_class': 'COMMAND_CLASS_BATTERY',
			'command_get': 'BATTERY_GET',
			'command_report': 'BATTERY_REPORT',
			'command_report_parser': report => {
				if (report['Battery Level'] === "battery low warning") return 1;
				
				return report['Battery Level (Raw)'][0];
			}
		},
	},
	
	settings: {
		"input_alarm_cancellation_delay": {
			"index": 1,
			"size": 2,
		},
		"led_status": {
			"index": 2,
			"size": 1,
		},
		"type_input": {
			"index": 3,
			"size": 1,
		},
		"temperature_measure_hystersis": {
			"index": 12,
			"size": 1,
		},
	}
});

module.exports.on('initNode', token => {
	const node = module.exports.nodes[token];
	if (node) {
		node.instance.CommandClass['COMMAND_CLASS_BASIC'].on('report', (command, report) => {
			if (command.name === 'BASIC_SET') {
				
				let newValue = false;
				if(report.Value === 255) {
					newValue = true;
				}
				
				module.exports.realtime(node.device_data, 'alarm_contact', newValue);
			}
		});
	}
});
