import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/nomination.dart';

class ApiService {
  // Node.js backend server URL running locally on network
  static const String baseUrl = 'http://10.92.97.42:5000/api';

  // 1. Fetch nominations list
  static Future<List<Nomination>> getNominations() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/nominations'));
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) => Nomination.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load nominations from server');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  // 2. Submit new nomination
  static Future<Nomination> submitNomination(Map<String, dynamic> nominationData) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/nominations'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(nominationData),
      );

      if (response.statusCode == 201) {
        final Map<String, dynamic> data = json.decode(response.body);
        return Nomination.fromJson(data);
      } else {
        final error = json.decode(response.body);
        throw Exception(error['error'] ?? 'Failed to submit nomination');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  // 3. Track existing nomination status by reference ID
  static Future<Nomination?> trackNomination(String refId) async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/nominations'));
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        final nominations = data.map((json) => Nomination.fromJson(json)).toList();
        
        // Find by reference ID
        for (var nom in nominations) {
          if (nom.id.toLowerCase() == refId.trim().toLowerCase()) {
            return nom;
          }
        }
        return null; // Not found
      } else {
        throw Exception('Failed to track nomination');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  // 4. Register volunteer/NGO/CSR partner
  static Future<Map<String, dynamic>> registerParticipant(Map<String, dynamic> regData) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/register'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(regData),
      );

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        final error = json.decode(response.body);
        throw Exception(error['error'] ?? 'Registration failed');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
}
