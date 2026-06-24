class Nomination {
  final String id;
  final String status;
  final String fullName;
  final String email;
  final String phone;
  final String projectName;
  final String category;
  final String description;
  final String state;
  final String district;
  final String panchayat;
  final List<String> sdgs;
  final List<String> ldgs;
  final Map<String, dynamic> metrics;
  final bool declaration;
  final Map<String, dynamic>? juryScores;
  final String juryRemarks;
  final String fieldVisit;

  Nomination({
    required this.id,
    required this.status,
    required this.fullName,
    required this.email,
    required this.phone,
    required this.projectName,
    required this.category,
    required this.description,
    required this.state,
    required this.district,
    required this.panchayat,
    required this.sdgs,
    required this.ldgs,
    required this.metrics,
    required this.declaration,
    this.juryScores,
    required this.juryRemarks,
    required this.fieldVisit,
  });

  factory Nomination.fromJson(Map<String, dynamic> json) {
    return Nomination(
      id: json['id'] ?? '',
      status: json['status'] ?? 'Pending',
      fullName: json['fullName'] ?? '',
      email: json['email'] ?? '',
      phone: json['phone'] ?? '',
      projectName: json['projectName'] ?? '',
      category: json['category'] ?? '',
      description: json['description'] ?? '',
      state: json['state'] ?? '',
      district: json['district'] ?? '',
      panchayat: json['panchayat'] ?? '',
      sdgs: List<String>.from(json['sdgs'] ?? []),
      ldgs: List<String>.from(json['ldgs'] ?? []),
      metrics: Map<String, dynamic>.from(json['metrics'] ?? {}),
      declaration: json['declaration'] ?? false,
      juryScores: json['juryScores'],
      juryRemarks: json['juryRemarks'] ?? '',
      fieldVisit: json['fieldVisit'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'status': status,
      'fullName': fullName,
      'email': email,
      'phone': phone,
      'projectName': projectName,
      'category': category,
      'description': description,
      'state': state,
      'district': district,
      'panchayat': panchayat,
      'sdgs': sdgs,
      'ldgs': ldgs,
      'metrics': metrics,
      'declaration': declaration,
      'juryScores': juryScores,
      'juryRemarks': juryRemarks,
      'fieldVisit': fieldVisit,
    };
  }
}
