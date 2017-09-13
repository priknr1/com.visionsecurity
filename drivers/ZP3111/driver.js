"use strict";

const path			= require('path');
const ZwaveDriver	= require('homey-zwavedriver');

//http://products.z-wavealliance.org/products/1572


module.exports = new ZwaveDriver( path.basename(__dirname), {
	debug: true,
	capabilities: {
		'alarm_motion': {
			'command_class'				: 'COMMAND_CLASS_NOTIFICATION',
			//'command_get'				: 'NOTIFICATION_GET',
			'command_get_parser'		: function(){
				return {
					"V1 Alarm Type" : 0,
					"Notification Type" : "Access Control",
					"Event" : 0,
				}
			},
			'command_report'			: 'NOTIFICATION_REPORT',
			'command_report_parser'		: function( report ){
				if (report['Event (Parsed)'] === 'Motion Detection, Unknown Location') {
					return true;
				}
				
				if (report['Event (Parsed)'] === 'Event inactive') {
					return false;
				}
				
				return null;
			}
		},

		'alarm_tamper': {
			'command_class'				: 'COMMAND_CLASS_NOTIFICATION',
			//'command_get'				: 'NOTIFICATION_GET',
			'command_get_parser'		: function(){
				return {
					"V1 Alarm Type" : 0,
					"Notification Type" : "Access Control",
					"Event" : 0,
				}
			},
			'command_report'			: 'NOTIFICATION_REPORT',
			'command_report_parser'		: function( report ){
				return report['Event (Parsed)'] === 'Tampering, Product covering removed';
			}
		},

		'measure_temperature': {
			'command_class'				: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			'command_get'				: 'SENSOR_MULTILEVEL_GET',
			'command_get_parser'		: function(){
				return {
					'Sensor Type': 'Temperature (version 1)',
					'Properties1': {
						'Scale': 0
					}
				}
			},
			'command_report'			: 'SENSOR_MULTILEVEL_REPORT',
			'command_report_parser'		: function( report ){
				if( report['Sensor Type'] !== 'Temperature (version 1)' )
					return null;

				return report['Sensor Value (Parsed)'];
			}
		},

		'measure_luminance': {
			'command_class'				: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			'command_get'				: 'SENSOR_MULTILEVEL_GET',
			'command_get_parser'		: function(){
				return {
					'Sensor Type': 'Luminance (version 1)',
					'Properties1': {
						'Scale': 0
					}
				}
			},
			'command_report'			: 'SENSOR_MULTILEVEL_REPORT',
			'command_report_parser'		: function( report ){
				if( report['Sensor Type'] !== 'Luminance (version 1)' )
					return null;

				return report['Sensor Value (Parsed)'];
			}
		},

		'measure_humidity': {
			'command_class'				: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			'command_get'				: 'SENSOR_MULTILEVEL_GET',
			'command_get_parser'		: function(){
				return {
					'Sensor Type': 'Relative humidity (version 2)',
					'Properties1': {
						'Scale': 0
					}
				}
			},
			'command_report'			: 'SENSOR_MULTILEVEL_REPORT',
			'command_report_parser'		: function( report ){
				if( report['Sensor Type'] !== 'Relative humidity (version 2)' )
					return null;

				return report['Sensor Value (Parsed)'];
			}
		}, 

		'measure_battery': {
			'command_class'				: 'COMMAND_CLASS_BATTERY',
			'command_get'				: 'BATTERY_GET',
			'command_report'			: 'BATTERY_REPORT',
			'command_report_parser'		: function( report ) {
				if( report['Battery Level'] === "battery low warning" ) return 1;
				return report['Battery Level (Raw)'][0];
			}
		}	
	},
	settings: {
		temperature_unit: {
			index: 1,
			size: 1,
		},
		temperature_delta: {
			index: 2,
			size: 1,
		},
		humidity_delta: {
			index: 3,
			size: 1,
		},
		light_delta: {
			index: 4,
			size: 1,
		},
		motion_timeout: {
			index: 5,
			size: 1,
			signed: false,
		},
		motion_sensitivity: {
			index: 6,
			size: 1,
		},
		led_mode: {
			index: 7,
			size: 1
		}
	}
})