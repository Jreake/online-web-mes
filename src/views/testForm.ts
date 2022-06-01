export const formData = {
	matrix_gateway: {
		ros__parameters: {
			server_address: ["127.0.0.1:19099", "2222", "3333"],
			robot_id: 102400,
			robot_type: "M600",
			reconnect_interval: true,
			connecting_timeout: 2,
			config: {
				debug_enable: true,
				wait_service_timeout: 1000,
				wait_result_timeout: 30000,
				map_load_srv: "/localization_node/map_file_list",
				map_change_srv: "/localization_node/initialLocalization",
				change_keepout_srv: [
					"/full_costmap/change_keepout",
					"/global_costmap/change_keepout",
					"/local_costmap/change_keepout"
				],
				change_topology_srv: "/change_topology",
				change_area_srv: "/change_area",
				topology: "topology.db",
				keepout: "keepout.db",
				mapconf: "semantic_object.db",
				get_version_info_service_name: "/package_util/get_version_info",
				get_robot_network_info_service_name:
					"/package_util/get_robot_network_info",
				machine_check_service_name: "/package_util/machine_check"
			},
			state: {
				debug_enable: true,
				odom_topic: "odom",
				map_updates_topic: "map_updates",
				bsp_topic: "bsp",
				power2pc_topic: "power2pc_topic",
				map_topic: "map",
				qrcode_map_topic: "tag_map",
				qrcode_type: 2,
				report_interval: 1000,
				metric_topic: "/monitor/metric",
				avoid_state_topic: "/avoid_feedback_out",
				localization_state_topic: "/localization_status",
				tag_topics: [
					"/matrix_slam/mapping/circle_tag_map",
					"/matrix_slam/mapping/tag_map",
					"/matrix_slam/mapping/ground_barc_map"
				],
				taskpoint_sub: "/matrix_slam/mapping/task_point_map"
			},
			visualiztion: {
				debug_enable: false,
				laser_scan_topic: "/sensor/lidar/front",
				local_path_topic: "/local_plan",
				global_path_topic: "/plan",
				footprint_topic: "/local_costmap/published_footprint_base",
				frame_name: "map",
				cloud_topics: [
					"/perception/freespace_detection/point_cloud0",
					"/perception/freespace_detection/point_cloud1"
				]
			},
			instruction: {
				debug_enable: true,
				sound_control_srv: "/sound",
				light_control_srv: "/lightbelt",
				clear_sw_emergency_srv: "/clear_software_emergency_stop",
				wait_service_timeout: 1000,
				wait_result_timeout: 60000,
				slam_switch_timeout: 200,
				mapping_nodes: ["geekslam_node", "occupancy_grid_node"],
				localization_nodes: [
					"localization_node",
					"controller_server",
					"planner_server",
					"recoveries_server",
					"coordinator"
				],
				clear_fault_srv: "/system/mcu/clear_fault",
				set_brake_release_srv: "/system/mcu/set_brake",
				mapping_param_modify_node: "geekslam_node",
				init_map_save_path: "/tmp/geekplus/init_map/",
				twist_topic: "/robogo/cmd_vel"
			},
			navigation: {
				mission_action: "/mission",
				wait_service_timeout: 1000,
				cancel_service_timeout: 5000,
				wait_result_timeout: 120000
			},
			data: {
				initial_pose_topic: "/initialpose",
				map_load_path: "/tmp/geekplus/map/",
				map_load_srv: "/localization_node/map_file_list",
				map_change_srv: "/localization_node/initialLocalization",
				qrcode_map_change_srv: "/change_qrcode_map",
				wait_service_timeout: 1000,
				wait_result_timeout: 90000,
				pub_task_point: "/gateway/task_point"
			},
			manager: {
				debug_enable: true,
				map_save_path: "/tmp/geekplus/map/",
				map_save_srv: "/get_map_path",
				get_qrcode_map_srv: "/get_qrcode_map",
				shutdown_action_name: "/pc2power_action",
				matrix_restart_script_1046: "restart_matrix_1046.sh",
				matrix_restart_script_tx2: "restart_matrix_tx2.sh",
				map_occ_node: "occupancy_grid_node",
				map_slam_node: "geekslam_node",
				qrcode_type: 2,
				wait_service_timeout: 1000,
				wait_result_timeout: 60000,
				circle_tag_filename: "circle_tag_map.json",
				side_tag_filename: "tag_map.json",
				ground_tag_filename: "qr_code_map.json",
				taskpoint_file: "task_point.json"
			},
			network: {
				debug_enable: true,
				net_info_srv: "get_net_info",
				get_wifi_list_action_name: "/network_util/get_wifi_list",
				connect_wifi_action_name: "/network_util/connect_wifi",
				get_hotspot_info_action_name: "/network_util/get_hotspot_info",
				change_hotspot_passwd_action_name:
					"/network_util/change_hotspot_passwd",
				set_hotspot_enable_action_name: "/network_util/set_hotspot_enable",
				change_hotspot_name_action_name: "/network_util/change_hotspot_name",
				change_bridge_static_mac_addr_action_name:
					"/network_util/change_bridge_static_mac_addr",
				set_wifi_enable_action_name: "/network_util/set_wifi_enable",
				set_ops_enable_action_name: "/network_util/set_ops_enable",
				wait_service_timeout: 1000,
				wait_result_timeout: 60000
			},
			slam: {
				debug_enable: true,
				wait_service_timeout: 1000,
				wait_result_timeout: 20000,
				slam_switch_timeout: 200,
				qrcode_mapping_nodes: ["tag_mapping"],
				qrcode_localization_nodes: ["fusion_localization"]
			},
			calib: {
				debug_enable: true,
				wait_service_timeout: 1000,
				wait_result_timeout: 20000,
				calib_process_topic: "/calibration/process",
				calib_image_topic: "/calibration/image",
				calib_control_topic: "/calibration/control",
				calib_heartbeat_topic: "/calibration/heartbeat",
				calib_command_srv: "/calibration/command",
				calib_file_path:
					"/home/geekplus/.matrix/params/calib/calib_params.yaml",
				calib_current_sensor_param: "calib_current_sensor",
				calib_robot_type_param: "robot_type",
				calib_param_node: "calib_param_manager"
			}
		}
	}
};
