import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../services/api_service.dart';

class RegistrationScreen extends StatefulWidget {
  const RegistrationScreen({super.key});

  @override
  State<RegistrationScreen> createState() => _RegistrationScreenState();
}

class _RegistrationScreenState extends State<RegistrationScreen> {
  final _formKey = GlobalKey<FormState>();
  bool isSubmitting = false;

  // Form inputs
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _orgController = TextEditingController();

  String _selectedRole = 'volunteer'; // default: volunteer, ngo, csr
  String _selectedInterest = 'Water Conservation';

  final List<String> _interests = [
    'Village Development',
    'Water Conservation',
    'Plastic-Free Initiatives',
    'Green Energy & Environment',
    'Education Excellence',
    'Rural Health & Sanitation',
    'Women Empowerment',
    'Agriculture Innovation',
    'Digital Literacy',
  ];

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _orgController.dispose();
    super.dispose();
  }

  Future<void> _submitRegistration() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => isSubmitting = true);

    final Map<String, dynamic> regData = {
      'name': _nameController.text,
      'email': _emailController.text,
      'phone': _phoneController.text,
      'role': _selectedRole,
      'interest': _selectedInterest,
      'org': _selectedRole != 'volunteer' ? _orgController.text : '',
    };

    try {
      final response = await ApiService.registerParticipant(regData);
      setState(() => isSubmitting = false);
      _showSuccessDialog(_selectedRole.toUpperCase(), response['mockEmailSent']?['to'] ?? _emailController.text);
    } catch (e) {
      setState(() => isSubmitting = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Registration failed: ${e.toString()}')),
      );
    }
  }

  void _showSuccessDialog(String roleName, String email) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          backgroundColor: const Color(0xFF161F30),
          title: Column(
            children: [
              const Icon(
                Icons.check_circle_outline,
                color: Color(0xFF10B981),
                size: 60,
              ),
              const SizedBox(height: 16),
              Text(
                'Registration Completed!',
                textAlign: TextAlign.center,
                style: GoogleFonts.outfit(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'You have registered as a **$roleName** under the Focus Area **$_selectedInterest**.',
                textAlign: TextAlign.center,
                style: GoogleFonts.inter(color: const Color(0xFF94A3B8)),
              ),
              const SizedBox(height: 12),
              Text(
                'A confirmation email has been dispatched to $email with further local block representative updates.',
                textAlign: TextAlign.center,
                style: GoogleFonts.inter(color: const Color(0xFF64748B), fontSize: 12),
              ),
            ],
          ),
          actionsAlignment: MainAxisAlignment.center,
          actions: [
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop(); // Dismiss Dialog
                Navigator.of(context).pop(); // Return to Dashboard
              },
              child: const Text('Back to Dashboard'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Community Registration'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Join Gram Panchayat Transformation',
                style: GoogleFonts.outfit(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Register as a Volunteer, NGO, or CSR Partner to support sustainable development goals in rural areas.',
                style: GoogleFonts.inter(
                  fontSize: 13,
                  color: const Color(0xFF94A3B8),
                ),
              ),
              const SizedBox(height: 24),

              // Segmented Role Selector
              _buildRoleSelector(),
              const SizedBox(height: 28),

              // Registration Form
              Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    TextFormField(
                      controller: _nameController,
                      decoration: const InputDecoration(
                        labelText: 'Contact Person / Full Name',
                        prefixIcon: Icon(Icons.person_outline),
                      ),
                      validator: (value) => value == null || value.isEmpty ? 'Please enter name' : null,
                    ),
                    const SizedBox(height: 16),
                    TextFormField(
                      controller: _emailController,
                      decoration: const InputDecoration(
                        labelText: 'Email Address',
                        prefixIcon: Icon(Icons.email_outlined),
                      ),
                      keyboardType: TextInputType.emailAddress,
                      validator: (value) => value == null || value.isEmpty ? 'Please enter email' : null,
                    ),
                    const SizedBox(height: 16),
                    TextFormField(
                      controller: _phoneController,
                      decoration: const InputDecoration(
                        labelText: 'Mobile Number',
                        prefixIcon: Icon(Icons.phone_outlined),
                      ),
                      keyboardType: TextInputType.phone,
                      validator: (value) => value == null || value.isEmpty ? 'Please enter phone' : null,
                    ),
                    
                    // NGO / CSR specific organization name field
                    if (_selectedRole != 'volunteer') ...[
                      const SizedBox(height: 16),
                      TextFormField(
                        controller: _orgController,
                        decoration: InputDecoration(
                          labelText: _selectedRole == 'ngo' ? 'NGO Registered Name' : 'Corporate / CSR Name',
                          prefixIcon: const Icon(Icons.business_outlined),
                        ),
                        validator: (value) => value == null || value.isEmpty ? 'Please enter organization name' : null,
                      ),
                    ],

                    const SizedBox(height: 16),
                    DropdownButtonFormField<String>(
                      value: _selectedInterest,
                      decoration: const InputDecoration(
                        labelText: 'Primary Focus Area (Interest)',
                        prefixIcon: Icon(Icons.volunteer_activism_outlined),
                      ),
                      items: _interests.map((String interest) {
                        return DropdownMenuItem<String>(
                          value: interest,
                          child: Text(interest, style: const TextStyle(fontSize: 14)),
                        );
                      }).toList(),
                      onChanged: (newValue) {
                        setState(() {
                          _selectedInterest = newValue!;
                        });
                      },
                    ),
                    const SizedBox(height: 36),

                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: isSubmitting ? null : _submitRegistration,
                        child: isSubmitting
                            ? const SizedBox(
                                width: 24,
                                height: 24,
                                child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                              )
                            : Text('Register as ${_selectedRole.toUpperCase()}'),
                      ),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildRoleSelector() {
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFF334155), width: 1),
      ),
      child: Row(
        children: [
          _buildRoleTab('volunteer', 'Volunteer'),
          _buildRoleTab('ngo', 'NGO / Trust'),
          _buildRoleTab('csr', 'CSR Partner'),
        ],
      ),
    );
  }

  Widget _buildRoleTab(String roleCode, String label) {
    final isSelected = _selectedRole == roleCode;
    return Expanded(
      child: GestureDetector(
        onTap: () {
          setState(() {
            _selectedRole = roleCode;
          });
        },
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: isSelected ? const Color(0xFFFF9933) : Colors.transparent,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: GoogleFonts.outfit(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: isSelected ? Colors.white : const Color(0xFF94A3B8),
            ),
          ),
        ),
      ),
    );
  }
}
