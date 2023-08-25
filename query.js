const query = require('query')

const processQuery = () => {
    const column_transformations_map = {
        'int': int,
        'float': float,
        'str': str,
        'formatTime': formatTime,
        'mapping.state': mapping.state,
        'mapping.reason1': mapping.reason1,
        'mapping.reason2': mapping.reason2,
        'mapping.reason3': mapping.reason3,
        'mapping.reason4': mapping.reason4,
        'mapping.reason5': mapping.reason5,
        'mapping.reason6': mapping.reason6,
        'mapping.error_code': mapping.error_code,
        'mapping.channel_state': mapping.channel_state,
        'mapping.process_timer_state': mapping.process_timer_state,
        'mapping.production_state': mapping.production_state,
        'mapping.production_state_internal': mapping.production_state_internal,
        'mapping.tcp_state': mapping.tcp_state,
        'mapping.toggle_switch': mapping.toggle_switch,
        'mapping.digital_display': mapping.digital_display,
        'mapping.run_mode': mapping.run_mode,
        'mapping.serial_mode': mapping.serial_mode,
        'mapping.sink_source': mapping.sink_source,
        'mapping.display_type': mapping.display_type,
        'mapping.event_type': mapping.event_type
    }

    
}