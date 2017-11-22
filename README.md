# Vision Security devices for Homey

Adds support for Vision Security devices in Homey.
If you like the work, please help me buy a stroller for my future kid :D 
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
">
<input type="image" src="https://www.paypalobjects.com/en_US/NL/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/nl_NL/i/scr/pixel.gif" width="1" height="1">
</form>

## Supported Devices
* ZD2102 Door/window sensor
* ZP3111 4in1 sensor
* ZP3102 PIR motion sensor
* ZG8108 Garage door sensor
* ZM1601 Battery Operated Siren
* ZM1602 DC/AC Power Siren

## Revision History

** V1.4.0
* 2 versions of ZP3102 available now  (ald and new had different command classes)
* Added some product ID's for ZP3102
* Added some product ID's for ZD2102

** V1.3.0
* Fixed all errors in ZP3111 driver

* V1.2.9
an extra } magically appeared in the driver for ZP3111

* V1.2.8
ZP3111 bugfix in setting LedMOde (no configuration set Buffer needed)

* V1.2.7
Added Door/window sensor ZD2102 new ID 262

* V1.2.6
Added Door/window sensor ZD2102

* V1.2.5
Added 4in1 sensor ZP3111 settings

* V1.2.3
Added 4in1 sensor ZP3111

* V1.2.2
Added PIR sensor ZP3102 

* V1.2.1
New owner and Siren class changed to "other"

* V1.1.0
Added Garagedoor sensor ZG8108 

