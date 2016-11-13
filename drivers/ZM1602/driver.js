'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// Vision Security ZM1602 DC/AC Power Siren
// http://www.pepper1.net/zwavedb/device/525

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		'onoff': {
			'command_class': 'COMMAND_CLASS_SWITCH_BINARY',
			'command_get': 'SWITCH_BINARY_GET',
			'command_set': 'SWITCH_BINARY_SET',
			'command_set_parser': value => {
				return {
					'Switch Value': (value > 0) ? 255 : 0
				};
			},
			'command_report': 'SWITCH_BINARY_REPORT',
			'command_report_parser': report => report['Value'] === 'on/enable'
		}
	},
	settings: {
		'siren_strobe_mode': {
			index: 1,
			size: 1
		},
		'alarm_auto_stop': {
			index: 2,
			size: 1
		}
	}
});