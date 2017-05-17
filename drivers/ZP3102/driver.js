"use strict";

const path			= require('path');
const ZwaveDriver	= require('homey-zwavedriver');

//https://www.zipato.com/product/multisensor-duo
// http://www.pepper1.net/zwavedb/device/197
// http://www.pepper1.net/zwavedb/device/142

module.exports = new ZwaveDriver( path.basename(__dirname), {
	debug: false,
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

		'measure_battery': {
			'command_class'				: 'COMMAND_CLASS_BATTERY',
			'command_get'				: 'BATTERY_GET',
			'command_report'			: 'BATTERY_REPORT',
			'command_report_parser'		: function( report ) {
				if( report['Battery Level'] === "battery low warning" ) return 1;
				return report['Battery Level (Raw)'][0];
			}
		}	
	}
})
