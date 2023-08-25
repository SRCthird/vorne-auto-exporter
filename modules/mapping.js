export class Mapping {
    constructor() {
        this.map = new Map();
    }

    event_type(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            1: 'Fatal',
            3: 'Non Fatal Error',
            5: 'Warning',
            7: 'Info',
            9: 'Debug'
        }
        return mapping[parsedInput] || 'unknown';
    }    

    display_type(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: 'Unknown Display Type',
            1: 'Display Type Alpha 0x0 none Digital Decimal 3x1 Red', 
            2: 'Display Type Alpha 0x0 none Digital Decimal 3x1 Tri', 
            3: 'Display Type Alpha 0x0 none Digital Decimal 4x1 Red', 
            4: 'Display Type Alpha 0x0 none Digital Decimal 4x1 Tri', 
            5: 'Display Type Alpha 0x0 none Digital Colon 4x1 Red', 
            6: 'Display Type Alpha 0x0 none Digital Colon 4x1 Tri', 
            7: 'Display Type Alpha 0x0 none Digital Decimal 6x1 Red', 
            8: 'Display Type Alpha 0x0 none Digital Decimal 6x1 Tri', 
            9: 'Display Type Alpha 0x0 none Digital Colon 6x1 Red', 
            10: 'Display Type Alpha 0x0 none Digital Colon 6x1 Tri', 
            11: 'Display Type Alpha 0x0 none Digital Decimal 8x1 Red', 
            12: 'Display Type Alpha 0x0 none Digital Decimal 8x1 Tri', 
            13: 'Display Type Alpha 0x0 none Digital Decimal 12x1 Red', 
            14: 'Display Type Alpha 0x0 none Digital Decimal 12x1 Tri', 
            15: 'Display Type Alpha 0x0 none Digital Decimal 6x3 Red', 
            16: 'Display Type Alpha 0x0 none Digital Decimal 6x3 Tri', 
            17: 'Display Type Alpha 0x0 none Digital Decimal 6x4 Red', 
            18: 'Display Type Alpha 0x0 none Digital Decimal 6x4 Tri', 
            19: 'Display Type Alpha 0x0 none Digital Decimal 6x6 Red', 
            20: 'Display Type Alpha 0x0 none Digital Decimal 6x6 Tri', 
            21: 'Display Type Alpha 80x32 tri Digital Decimal 0x0 none', 
            22: 'Display Type Alpha 120x32 tri Digital Decimal 0x0 none', 
            23: 'Display Type Alpha 160x32 tri Digital Decimal 0x0 none', 
            24: 'Display Type Alpha 240x32 tri Digital Decimal 0x0 none', 
            25: 'Display Type Dual Displays'
        }
        return mapping[parsedInput] || 'unknown';
    }    

    sink_source(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            1: 'Sink', 
            2: 'Source'
        }
        return mapping[parsedInput] || 'unknown';
    }    

    serial_mode(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            'RS 232': 0,
            'RS 485': 1
        }
        return mapping[parsedInput] || 'unknown';
    }    

    run_mode(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: 'Bootstrap', 
            1: 'Normal'
        }
        return mapping[parsedInput] || 'unknown';
    }    

    digital_display(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: 'Xl400 Xl800', 
            1: 'Xl600 Xl800'
        }
        return mapping[parsedInput] || 'unknown';
    }    

    toggle_switch(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: 'Off', 
            1: 'On'
        }
        return mapping[parsedInput] || 'unknown';
    }    

    tcp_state(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: 'Invalid State', 
            1: 'Closed', 
            2: 'Listening',  
            3: 'Syn Sent', 
            4: 'Syn Received', 
            5: 'Established', 
            6: 'Close Wait', 
            7: 'Fin Wait 1', 
            8: 'Fin Wait 2', 
            9: 'Closing', 
            10: 'Time Wait', 
            11: 'Last Ack'
        }
        return mapping[parsedInput] || 'unknown';
    }    

    production_state_internal(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: 'Standby Until Run', 
            1: 'Auto Run Down', 
            2: 'Run', 
            3: 'Down',
            4: 'Setup', 
            5: 'Standby'
        }
        return mapping[parsedInput] || 'unknown';
    }    

    production_state(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: 'Run', 
            1: 'Down', 
            2: 'Setup', 
            3: 'Standby',
            4: 'Offline'
        }
        return mapping[parsedInput] || 'unknown';
    }    

    process_timer_state(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: 'Timing Up', 
            1: 'Timing Down',
            2: 'Paused Resume Up',
            3: 'Paused Resume Down',
            4: 'Stopped Until Reset'
        }
        return mapping[parsedInput] || 'unknown';
    }    

    channel_state(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: 'Available',  
            1: 'In Use', 
            2: 'Transfer Succeeded',  
            3: 'Transfer Failed' 
        }
        return mapping[parsedInput] || 'unknown';
    }    

    error_code(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: 'No Error', 
            100: 'Assertion', 
            101: 'Processor Exception', 
            102: 'Hardware Initialization Failure', 
            103: 'Hardware Failure', 
            104: 'Obsolete Digital Input Overflow', 
            105: 'Background Operation Failure', 
            106: 'Unhandled Posix Signal', 
            107: 'unhandled_exception', 
            108: 'Storage Recovery Failure', 
            109: 'Storage Assertion', 
            110: 'Invalid Main Application', 
            300: 'Unexpected Software Delay', 
            301: 'Timer Task Not Completed', 
            302: 'Non Fatal Hardware Failure', 
            303: 'Battery Depleted', 
            304: 'Rate Calculation Out Of Range', 
            305: 'OEE Calculation Out Of Range', 
            306: 'Configuration Out Of Range', 
            307: 'Program Command Error', 
            308: 'Stream Corrupted', 
            309: 'Production And Settings Data Corrupted', 
            310: 'Module Configuration Corrupted', 
            311: 'Messages And Graphics Corrupted', 
            312: 'Configuration Data Storage Error', 
            313: 'Stream Data Storage Error', 
            314: 'Unsupported Configuration Value', 
            315: 'Program Corrupted', 
            316: 'Digital Input Overflow', 
            317: 'Software Initialization Failure', 
            318: 'Non Critical Software Failure', 
            319: 'Stream Buffer Overflow', 
            320: 'Journal Error', 
            321: 'Journal Replacement Nvm Error', 
            322: 'Default Mac Address Error', 
            323: 'Invalid Recovery Application', 
            324: 'IP Conflict Detected Error', 
            325: 'Tried To Run Invalid Part ID', 
            326: 'Tried To Run Unknown Job ID', 
            327: 'Program Execution Failure', 
            328: 'Clone Display Data Not Received', 
            329: 'Non Critical Clock Failure', 
            330: 'Data Verification Failure', 
            331: 'Network Settings Barcode Disregarded', 
            500: 'Digital Input Rate Warning', 
            501: 'External Command Invalid', 
            502: 'External Command Out Of Bounds', 
            503: 'External Command Too Long', 
            504: 'Web Server Command Failure', 
            505: 'DHCP Operation Failure', 
            506: 'DHCP DNS Assignment Failure', 
            507: 'Time Server Unavailable', 
            508: 'Stream Buffer Warning', 
            509: 'Database Status Warning', 
            510: 'Journal Warning', 
            511: 'Program Command Warning', 
            512: 'Default Mac Address Warning', 
            513: 'Timer Task Overrun Warning', 
            514: 'Invalid Schedule Configuration Warning', 
            515: 'Client Server Time Mismatch', 
            516: 'Program Not Found', 
            517: 'Message Not Found', 
            518: 'Uploaded File Error', 
            519: 'current Production Data May Be Incorrect', 
            520: 'Web Client Failure', 
            524: 'Arp Probe Detected Warning', 
            525: 'Excess Run Time Correction', 
            526: 'State Reason Mismatch', 
            700: 'Stored Data Erased', 
            701: 'Error Code Cleared', 
            702: 'Configuration Entered', 
            703: 'Configuration Exited', 
            704: 'Production Interval Reset', 
            705: 'Date Time Changed', 
            706: 'Counter Value Set Manually', 
            707: 'Input Triggered Manually', 
            708: 'Device Rebooted Manually', 
            709: 'File Bouncing Failure', 
            710: 'IP Address Changed', 
            711: 'Device Powered Up', 
            712: 'Time Server Available', 
            713: 'Device Powered Down', 
            714: 'Configuration Changed', 
            715: 'Invalid Network Recovery Request', 
            716: 'Journal Information', 
            717: 'Journal Block Information', 
            718: 'Journal Journal Information', 
            719: 'Entered Special System Mode Information', 
            720: 'Thread Stack Information', 
            721: 'Time Schedule Enabled', 
            722: 'Time Schedule Disabled', 
            723: 'Password Changed', 
            724: 'Restored Backup', 
            725: 'Resource Threshold Change', 
            726: 'Csv Import On Client', 
            727: 'Demo Data Generated', 
            728: 'Unexpected VIC1 Vectored Interrupt', 
            729: 'unexpected VIC2 Vectored Interrupt', 
            730: 'unexpected VIC1 Default Interrupt', 
            731: 'unexpected VIC2 Default Interrupt', 
            732: 'Unrecognized IRQ', 
            733: 'Network Packet Trace', 
            734: 'Event Visibility Changed', 
            735: 'Invalid Data Record Detected', 
            900: 'Debug Trace'
        }
        return mapping[parsedInput] || 'unknown';
    }    

    state(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: "Running",
            1: "Down",
            2: "Setup",
            3: "Standby",
            4: "Offline"
        }
        return mapping[parsedInput] || 'unknown';
    }    

    reason1(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: "None",
            1: "Offline",
            2: "Powered Off",
            3: "Running",
            4: "Standby",
            5: "Break",
            6: "Lunch",
            7: "Setup",
            8: "Changeover",
            9: "Down (Misc.)",
            10: "Breakdown",
            11: "Jam",
            12: "No Materials",
            13: "No Operator",
            14: "Adjustment",
            15: "Cleaning",
            16: "Autonomous Maintenance",
            1023: "SID Full",
            1035: "Planned Downtime",
            1039: "Machine Jammed",
            1043: "Other",
            1044: "Lot Change",
            1046: "Rack did not Advance",
            1047: "Waiting For Parts LID 1",
            1049: "Waiting for Parts LID 2",
            1050: "Gripper Arm Issue",
            1051: "Troubleshooting",
            1052: "Deviated Mat'l Check",
            1053: "Waiting for Spindles",
            1054: "Press Head Issue",
            1055: "Evac Issue"
        }
        return mapping[parsedInput] || 'unknown';
    }    

    reason2(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0 : "None", 
            1 : "Offline",
            2 : "Powered Off", 
            3 : "Running", 
            4 : "Standby", 
            5 : "Break", 
            6 : "Lunch", 
            7 : "Setup", 
            8 : "Changeover", 
            9 : "Down (Misc.)",
            10 : "Breakdown", 
            11 : "Jam", 
            12 : "No Materials", 
            13 : "No Operator", 
            14 : "Adjustment", 
            15 : "Cleaning", 
            16 : "Autonomous Maintenance", 
            1037 : "Planned Downtime", 
            1042 : "Sprayer Issue", 
            1043 : "Other", 
            1044 : "Lot Change", 
            1047 : "Wetting Issue", 
            1048 : "Pair Test Issue", 
            1049 : "Cutting Issue", 
            1050 : "Shuttle Issue", 
            1051 : "Spinner Issue", 
            1052 : "Waiting for parts", 
            1053 : "Camera Issue", 
            1054 : "End of Filter", 
            1055 : "Spindle Issue", 
            1056 : "Rack Issue", 
            1057 : "Waiting for Spindles" 
        }
        return mapping[parsedInput] || 'unknown';
    }    

    reason3(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: "None", 
            1: "Offline",
            2: "Powered Off", 
            3: "Running", 
            4: "Standby", 
            5: "Break", 
            6: "Lunch", 
            7: "Setup", 
            8: "Changeover", 
            9: "Down (Misc.)",
            10: "Breakdown", 
            11: "Jam", 
            12: "No Materials", 
            13: "No Operator", 
            14: "Adjustment", 
            15: "Cleaning", 
            16: "Autonomous Maintenance", 
            1037: "Planned Downtime", 
            1042: "Sprayer Issue", 
            1043: "Other", 
            1044: "Lot Change", 
            1047: "Wetting Issue", 
            1048: "Pair Test Issue", 
            1049: "Cutting Issue", 
            1050: "Shuttle Issue", 
            1051: "Spinner Issue", 
            1052: "Waiting for parts", 
            1053: "Camera Issue", 
            1054: "Troubleshooting",
            1055: "5 Micron Run",
            1056: "Bonding Issue",
            1057: "Pick And Place",
            1058: "Machine Jammed",
            1059: "End of Filter"
        }
        return mapping[parsedInput] || 'unknown';
    }    

    reason4(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: "None", 
            1: "Offline",
            2: "Powered Off", 
            3: "Running", 
            4: "Standby", 
            5: "Break", 
            6: "Lunch", 
            7: "Setup", 
            8: "Changeover", 
            9: "Down (Misc.)",
            10: "Breakdown", 
            11: "Jam", 
            12: "No Materials", 
            13: "No Operator", 
            14: "Adjustment", 
            15: "Cleaning", 
            16: "Autonomous Maintenance", 
            1023: "SID Full",
            1030: "Waiting For Mechanic",
            1031: "Staffing",
            1032: "Waiting For Parts",
            1034: "Troubleshooting",
            1037: "Planned Downtime",
            1038: "No Coverage/Personnel",
            1039: "Machine Jammed",
            1040: "Mech Cleaning",
            1042: "Mechanical Issue",
            1043: "Other",
            1044: "Lot Change",
            1047: "053 Down",
            1048: "Press Issue",
            1049: "Gripper Issue"
        }
        return mapping[parsedInput] || 'unknown';
    }    

    reason5(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: "None",
            1: "Offline",
            2: "Powered Off",
            3: "Running",
            4: "Standby",
            5: "Break",
            6: "Lunch",
            7: "Setup",
            8: "Changeover",
            9: "Down (Misc.)",
            10: "Breakdown",
            11: "Jam",
            12: "No Materials",
            13: "No Operator",
            14: "Adjustment",
            15: "Cleaning",
            16: "Autonomous Maintenance",
            1037: "Planned Downtime",
            1042: "Sprayer Issue",
            1043: "Other",
            1044: "Lot Change",
            1047: "Wetting Issue",
            1048: "Pair Test Issue",
            1049: "Cutting Issue",
            1050: "Shuttle Issue",
            1051: "Spinner Issue",
            1052: "Waiting for parts",
            1053: "Camera Issue",
            1054: "End of Filter",
            1055: "Spindle Issue",
            1056: "Rack Issue"
        }
        return mapping[parsedInput] || 'unknown';
    }    

    reason6(input) {
        const parsedInput = parseInt(input, 10);
        const mapping = {
            0: "None",
            1: "Offline",
            2: "Powered Off",
            3: "Running",
            4: "Standby",
            5: "Break",
            6: "Lunch",
            7: "Setup",
            8: "Changeover",
            9: "Down (Misc.)",
            10: "Breakdown",
            11: "Jam",
            12: "No Materials",
            13: "No Operator",
            14: "Adjustment",
            15: "Cleaning",
            16: "Autonomous Maintenance",
            1031: "Staffing",
            1032: "Waiting For Parts",
            1034: "Troubleshooting",
            1037: "Planned Downtime",
            1038: "No Coverage/Personnel",
            1039: "Robot Fault",
            1040: "Machine Cleaning",
            1043: "Other",
            1044: "Lot Change",
            1048: "Labeling Issue",
            1049: "End Cap Fault",
            1050: "Conveyor Jam"
        }
        return mapping[parsedInput] || 'unknown';
    }
};

export default Mapping;