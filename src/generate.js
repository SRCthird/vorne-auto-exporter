import mysql from 'mysql2/promise';

setTimeout(() => {
  const passwordConfig = {
    host: 'localhost',
    user: 'root'
  };
  
  async function setPassword() {
    const connection = await mysql.createConnection(passwordConfig);
    try {
      await connection.query('ALTER USER \'root\'@\'localhost\' IDENTIFIED BY \'aragorn\';');
    } catch (err) {
      console.error(`Error creating password:`, err);
    } finally {
      await connection.end();
    }
  }

  setPassword();

  setTimeout(() => {
    
    const connectionConfig = {
      host: 'localhost',
      user: 'root',
      password: 'aragorn'
    };

    const databaseList = ['MD_Pairer_L12', 'MD_SID_1_12', 'MD_SID_2_12', 'MD_Pairer_L34', 'MD_SID_1_34', 'MD_Auto_Assembly'];

    async function createDatabases() {
      for (let database of databaseList) {
        const connection = await mysql.createConnection(connectionConfig);
        try {
          await connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
          console.log(`${database} created or already exists.`);
        } catch (err) {
          console.error(`Error creating database ${database}:`, err);
        } finally {
          await connection.end();
        }
      }
    }

    createDatabases();
    
    setTimeout(() => {

      databaseList.map(database => {
          const config = {
            host: 'localhost',
            user: 'root',
            password: 'aragorn',
            database: database
          };
          
          const tables = [
            {
              name: 'critical_diagnostic_stream',
              query: `
                  CREATE TABLE IF NOT EXISTS critical_diagnostic_stream (
                      sequence_number INT PRIMARY KEY,
                      event_type VARCHAR(255),
                      event_id VARCHAR(255),
                      event_time DATETIME,
                      event_data VARCHAR(255),
                      global_sequence_number INT
                  );  
              `
            },
            {
              name: 'diagnostic_stream',
              query: `
                  CREATE TABLE IF NOT EXISTS diagnostic_stream (
                      sequence_number INT PRIMARY KEY,
                      event_type VARCHAR(255),
                      event_id VARCHAR(255),
                      event_time DATETIME,
                      event_data VARCHAR(255),
                      global_sequence_number INT
                  );
              `
            },
            {
              name: 'interval_stream',
              query: `
                  CREATE TABLE IF NOT EXISTS interval_stream (
                      total_count INT,
                      good_count DECIMAL(10,2),
                      average_rate_total DECIMAL(10,2),
                      reject_count DECIMAL(10,2),
                      availability DECIMAL(10,2),
                      performance DECIMAL(10,2),
                      quality DECIMAL(10,2),
                      oee DECIMAL(10,2),
                      run_time DECIMAL(10,2),
                      down_time DATETIME,
                      setup_time DECIMAL(10,2),
                      standby_time DECIMAL(10,2),
                      total_time DECIMAL(10,2),
                      percent_run DECIMAL(10,2),
                      percent_down DECIMAL(10,2),
                      percent_setup DECIMAL(10,2),
                      percent_standby DECIMAL(10,2),
                      takt_time DECIMAL(10,2),
                      ideal_cycle_time DECIMAL(10,2),
                      efficiency DECIMAL(10,2),
                      target_count INT,
                      average_cycle_time DECIMAL(10,2),
                      goal_count DECIMAL(10,2),
                      standard_cycles INT,
                      slow_cycles INT,
                      small_stops INT,
                      standard_cycles_time DECIMAL(10,2),
                      slow_cycles_time DECIMAL(10,2),
                      small_stops_time DECIMAL(10,2),
                      first_user_number INT,
                      second_user_number DECIMAL(10,2),
                      third_user_number INT,
                      fourth_user_number INT,
                      fifth_user_number INT,
                      sixth_user_number INT,
                      seventh_user_number INT,
                      eighth_user_number INT,
                      first_user_string VARCHAR(255),
                      second_user_string DECIMAL(10,2),
                      third_user_string VARCHAR(255),
                      fourth_user_string VARCHAR(255),
                      part_id VARCHAR(255),
                      asset_id VARCHAR(255),
                      start_time DATETIME,
                      end_time DATETIME,
                      interval_id VARCHAR(255),
                      sequence_number INT PRIMARY KEY,
                      manufacturing_time DATETIME,
                      production_time DECIMAL(10,2),
                      pieces_to_goal INT,
                      percent_toward_goal DECIMAL(10,2),
                      percent_good DECIMAL(10,2),
                      percent_reject DECIMAL(10,2),
                      average_rate_good DECIMAL(10,2),
                      average_rate_reject DECIMAL(10,2),
                      count_variance INT,
                      type VARCHAR(255),
                      order_number INT,
                      global_sequence_number INT,
                      time_variance DECIMAL(10,2),
                      production_day INT,
                      down_loss_time DECIMAL(10,2),
                      down_loss_percent DECIMAL(10,2),
                      setup_loss_time DECIMAL(10,2),
                      setup_loss_percent DECIMAL(10,2),
                      performance_loss_time DECIMAL(10,2),
                      performance_loss_percent DECIMAL(10,2),
                      quality_loss_time DECIMAL(10,2),
                      quality_loss_percent DECIMAL(10,2),
                      availability_loss_time DECIMAL(10,2),
                      availability_loss_percent DECIMAL(10,2),
                      total_loss_time DECIMAL(10,2),
                      total_loss_percent DECIMAL(10,2),
                      interval_number INT,
                      hidden VARCHAR(255),
                      hidden_time DATETIME,
                      last_modified_sequence_number INT,
                      stub INT
                  );
              `
            },
            {
              name: 'interval_stream_base',
              query: `
                  CREATE TABLE IF NOT EXISTS interval_stream_base (
                      total_count INT,
                      good_count DECIMAL(10,2),
                      average_rate_total DECIMAL(10,2),
                      reject_count DECIMAL(10,2),
                      availability DECIMAL(10,2),
                      performance DECIMAL(10,2),
                      quality DECIMAL(10,2),
                      oee DECIMAL(10,2),
                      run_time DECIMAL(10,2),
                      down_time DATETIME,
                      setup_time DECIMAL(10,2),
                      standby_time DECIMAL(10,2),
                      total_time DECIMAL(10,2),
                      percent_run DECIMAL(10,2),
                      percent_down DECIMAL(10,2),
                      percent_setup DECIMAL(10,2),
                      percent_standby DECIMAL(10,2),
                      takt_time DECIMAL(10,2),
                      ideal_cycle_time DECIMAL(10,2),
                      efficiency DECIMAL(10,2),
                      target_count INT,
                      average_cycle_time DECIMAL(10,2),
                      goal_count DECIMAL(10,2),
                      standard_cycles INT,
                      slow_cycles INT,
                      small_stops INT,
                      standard_cycles_time DECIMAL(10,2),
                      slow_cycles_time DECIMAL(10,2),
                      small_stops_time DECIMAL(10,2),
                      first_user_number INT,
                      second_user_number DECIMAL(10,2),
                      third_user_number INT,
                      fourth_user_number INT,
                      fifth_user_number INT,
                      sixth_user_number INT,
                      seventh_user_number INT,
                      eighth_user_number INT,
                      first_user_string VARCHAR(255),
                      second_user_string DECIMAL(10,2),
                      third_user_string VARCHAR(255),
                      fourth_user_string VARCHAR(255),
                      part_id VARCHAR(255),
                      asset_id VARCHAR(255),
                      start_time DATETIME,
                      end_time DATETIME,
                      interval_id VARCHAR(255),
                      sequence_number INT PRIMARY KEY,
                      manufacturing_time DATETIME,
                      production_time DECIMAL(10,2),
                      pieces_to_goal INT,
                      percent_toward_goal DECIMAL(10,2),
                      percent_good DECIMAL(10,2),
                      percent_reject DECIMAL(10,2),
                      average_rate_good DECIMAL(10,2),
                      average_rate_reject DECIMAL(10,2),
                      count_variance INT,
                      type VARCHAR(255),
                      order_number INT,
                      global_sequence_number INT,
                      time_variance DECIMAL(10,2),
                      production_day INT,
                      down_loss_time DECIMAL(10,2),
                      down_loss_percent DECIMAL(10,2),
                      setup_loss_time DECIMAL(10,2),
                      setup_loss_percent DECIMAL(10,2),
                      performance_loss_time DECIMAL(10,2),
                      performance_loss_percent DECIMAL(10,2),
                      quality_loss_time DECIMAL(10,2),
                      quality_loss_percent DECIMAL(10,2),
                      availability_loss_time DECIMAL(10,2),
                      availability_loss_percent DECIMAL(10,2),
                      total_loss_time DECIMAL(10,2),
                      total_loss_percent DECIMAL(10,2),
                      interval_number INT,
                      hidden VARCHAR(255),
                      hidden_time DATETIME,
                      last_modified_sequence_number INT,
                      stub INT
                  );
              `
            },
            {
              name: 'timeline_stream',
              query: `
                  CREATE TABLE IF NOT EXISTS timeline_stream (
                      sequence_number INT PRIMARY KEY,
                      start_time DATETIME,
                      state VARCHAR(255),
                      reason VARCHAR(255),
                      duration DECIMAL(10,2),
                      end_time DATETIME,
                      global_sequence_number INT,
                      event_number INT,
                      job_number VARCHAR(255),
                      shift_number VARCHAR(255)
                  );
              `
            },
            {
              name: 'timeline_stream_v2',
              query: `
                  CREATE TABLE IF NOT EXISTS timeline_stream_v2 (
                      sequence_number INT PRIMARY KEY,
                      start_time DATETIME,
                      state VARCHAR(255),
                      reason VARCHAR(255), 
                      duration DECIMAL(10,2),
                      end_time DATETIME,
                      global_sequence_number INT,
                      event_number INT,
                      job_number VARCHAR(255),
                      shift_number VARCHAR(255)
                  );
              `
            }
          ];
          
          async function createTables() {
            const connection = await mysql.createConnection(config);
          
            for (const table of tables) {
              try {
                await connection.query(table.query);
                console.log(`Table ${table.name} created successfully.`);
              } catch (err) {
                console.error(`Error creating table ${table.name}:`, err);
              }
            }
          
            connection.end();
          }
          
          createTables();    
      });
    }, 5000);
  }, 5000);
}, 5000);