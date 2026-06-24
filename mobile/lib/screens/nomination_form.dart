import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../services/api_service.dart';

class NominationFormScreen extends StatefulWidget {
  const NominationFormScreen({super.key});

  @override
  State<NominationFormScreen> createState() => _NominationFormScreenState();
}

class _NominationFormScreenState extends State<NominationFormScreen> {
  int currentStep = 0;
  final int totalSteps = 3;
  bool isSubmitting = false;

  // Form keys
  final _step1Key = GlobalKey<FormState>();
  final _step2Key = GlobalKey<FormState>();
  final _step3Key = GlobalKey<FormState>();

  // Form Fields State
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _projectNameController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final TextEditingController _stateController = TextEditingController();
  final TextEditingController _districtController = TextEditingController();
  final TextEditingController _panchayatController = TextEditingController();

  String _selectedCategory = 'Village Development Award';
  final List<String> _categories = [
    'Village Development Award',
    'Smart Village Award',
    'Plastic-Free Village Award',
    'Green Village Award',
    'Water Conservation Award',
    'Education Excellence Award',
    'Health & Hygiene Award',
    'Women Empowerment Award',
    'Agriculture Innovation Award',
    'Digital Village Award',
    'Youth Leadership Award',
    'Best Volunteer Award',
    'Best NGO Award',
    'Social Entrepreneurship Award',
    'Climate Action Award',
    'Biodiversity Conservation Award'
  ];

  // SDGs mapping state (multi-select)
  final Map<String, bool> _sdgMap = {
    'Goal 1: No Poverty': false,
    'Goal 3: Good Health & Well-being': false,
    'Goal 4: Quality Education': false,
    'Goal 5: Gender Equality': false,
    'Goal 6: Clean Water & Sanitation': false,
    'Goal 7: Affordable & Clean Energy': false,
    'Goal 11: Sustainable Cities & Communities': false,
    'Goal 13: Climate Action': false,
    'Goal 15: Life on Land': false,
  };

  // Metrics states
  final TextEditingController _metric1Controller = TextEditingController(); // e.g., Trees planted or Villages impacted
  final TextEditingController _metric2Controller = TextEditingController(); // e.g., Plastic collected or Households covered

  bool _declared = false;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _projectNameController.dispose();
    _descriptionController.dispose();
    _stateController.dispose();
    _districtController.dispose();
    _panchayatController.dispose();
    _metric1Controller.dispose();
    _metric2Controller.dispose();
    super.dispose();
  }

  void _nextStep() {
    if (currentStep == 0) {
      if (_step1Key.currentState!.validate()) {
        setState(() => currentStep++);
      }
    } else if (currentStep == 1) {
      if (_step2Key.currentState!.validate()) {
        setState(() => currentStep++);
      }
    }
  }

  void _prevStep() {
    if (currentStep > 0) {
      setState(() => currentStep--);
    }
  }

  Future<void> _submitNomination() async {
    if (!_step3Key.currentState!.validate() || !_declared) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please accept the declaration before submitting.')),
      );
      return;
    }

    setState(() => isSubmitting = true);

    // Selected SDGs list
    final List<String> selectedSdgs = [];
    _sdgMap.forEach((key, value) {
      if (value) selectedSdgs.add(key.split(':')[0]);
    });

    // Structure metrics object based on selected category
    final Map<String, dynamic> metrics = {
      'metric1Value': _metric1Controller.text,
      'metric2Value': _metric2Controller.text,
    };

    final Map<String, dynamic> nominationData = {
      'fullName': _nameController.text,
      'email': _emailController.text,
      'phone': _phoneController.text,
      'projectName': _projectNameController.text,
      'category': _selectedCategory,
      'description': _descriptionController.text,
      'state': _stateController.text,
      'district': _districtController.text,
      'panchayat': _panchayatController.text,
      'sdgs': selectedSdgs,
      'ldgs': ['Clean & Green Village', 'Healthy Village'],
      'metrics': metrics,
      'declaration': _declared,
    };

    try {
      final result = await ApiService.submitNomination(nominationData);
      setState(() => isSubmitting = false);
      _showSuccessDialog(result.id);
    } catch (e) {
      setState(() => isSubmitting = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Submission failed: ${e.toString()}')),
      );
    }
  }

  void _showSuccessDialog(String refId) {
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
                'Submission Successful!',
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
                'Your application has been received. Please note your Reference ID for live tracking:',
                textAlign: TextAlign.center,
                style: GoogleFonts.inter(color: const Color(0xFF94A3B8)),
              ),
              const SizedBox(height: 16),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 12),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E293B),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: const Color(0xFFFF9933), width: 1.5),
                ),
                child: Text(
                  refId,
                  textAlign: TextAlign.center,
                  style: GoogleFonts.outfit(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: const Color(0xFFFF9933),
                    letterSpacing: 1,
                  ),
                ),
              ),
            ],
          ),
          actionsAlignment: MainAxisAlignment.center,
          actions: [
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop(); // Dismiss Dialog
                Navigator.of(context).pop(); // Back to Home Screen
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
        title: const Text('New Nomination'),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Custom Stepper Indicator
            _buildStepperIndicator(),
            const Divider(color: Color(0xFF334155), height: 1),

            // Form Wizard Content
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(20.0),
                child: _buildCurrentFormStep(),
              ),
            ),

            // Bottom Navigation Buttons
            _buildBottomButtons(),
          ],
        ),
      ),
    );
  }

  Widget _buildStepperIndicator() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 16.0, horizontal: 24.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: List.generate(totalSteps, (index) {
          final isCompleted = index < currentStep;
          final isActive = index == currentStep;
          return Expanded(
            child: Row(
              children: [
                Container(
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                    color: isCompleted
                        ? const Color(0xFF138808)
                        : isActive
                            ? const Color(0xFFFF9933)
                            : const Color(0xFF1E293B),
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: isActive ? const Color(0xFFFF9933) : const Color(0xFF334155),
                      width: 2,
                    ),
                  ),
                  child: Center(
                    child: isCompleted
                        ? const Icon(Icons.check, size: 16, color: Colors.white)
                        : Text(
                            '${index + 1}',
                            style: GoogleFonts.outfit(
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                  ),
                ),
                if (index < totalSteps - 1)
                  Expanded(
                    child: Container(
                      height: 2,
                      color: index < currentStep ? const Color(0xFF138808) : const Color(0xFF334155),
                    ),
                  ),
              ],
            ),
          );
        }),
      ),
    );
  }

  Widget _buildCurrentFormStep() {
    switch (currentStep) {
      case 0:
        return _buildStep1BasicInfo();
      case 1:
        return _buildStep2ProjectDetails();
      case 2:
        return _buildStep3SdgsDeclaration();
      default:
        return Container();
    }
  }

  Widget _buildStep1BasicInfo() {
    return Form(
      key: _step1Key,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Personal Details',
            style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _nameController,
            decoration: const InputDecoration(labelText: 'Full Name'),
            validator: (value) => value == null || value.isEmpty ? 'Enter full name' : null,
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _emailController,
            decoration: const InputDecoration(labelText: 'Email Address'),
            keyboardType: TextInputType.emailAddress,
            validator: (value) => value == null || value.isEmpty ? 'Enter email address' : null,
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _phoneController,
            decoration: const InputDecoration(labelText: 'Phone Number'),
            keyboardType: TextInputType.phone,
            validator: (value) => value == null || value.isEmpty ? 'Enter phone number' : null,
          ),
          const SizedBox(height: 24),
          Text(
            'Geographical Location',
            style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _stateController,
            decoration: const InputDecoration(labelText: 'State'),
            validator: (value) => value == null || value.isEmpty ? 'Enter State name' : null,
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _districtController,
            decoration: const InputDecoration(labelText: 'District'),
            validator: (value) => value == null || value.isEmpty ? 'Enter District name' : null,
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _panchayatController,
            decoration: const InputDecoration(labelText: 'Gram Panchayat'),
            validator: (value) => value == null || value.isEmpty ? 'Enter Gram Panchayat name' : null,
          ),
        ],
      ),
    );
  }

  Widget _buildStep2ProjectDetails() {
    return Form(
      key: _step2Key,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Award & Project Details',
            style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          DropdownButtonFormField<String>(
            value: _selectedCategory,
            decoration: const InputDecoration(labelText: 'Award Category'),
            items: _categories.map((String category) {
              return DropdownMenuItem<String>(
                value: category,
                child: Text(category, style: const TextStyle(fontSize: 13)),
              );
            }).toList(),
            onChanged: (newValue) {
              setState(() {
                _selectedCategory = newValue!;
                _metric1Controller.clear();
                _metric2Controller.clear();
              });
            },
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _projectNameController,
            decoration: const InputDecoration(labelText: 'Project Title'),
            validator: (value) => value == null || value.isEmpty ? 'Enter project title' : null,
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _descriptionController,
            decoration: const InputDecoration(
              labelText: 'Project Description / Summary',
              alignLabelWithHint: true,
            ),
            maxLines: 4,
            validator: (value) => value == null || value.isEmpty ? 'Enter project description' : null,
          ),
          const SizedBox(height: 24),
          Text(
            'Key Performance Indicators',
            style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          _buildDynamicFields(),
        ],
      ),
    );
  }

  Widget _buildDynamicFields() {
    if (_selectedCategory == 'Water Conservation Award') {
      return Column(
        children: [
          TextFormField(
            controller: _metric1Controller,
            decoration: const InputDecoration(
              labelText: 'Total Rainwater Harvesting Structures Restored',
              hintText: 'e.g., 25 units',
            ),
            validator: (value) => value == null || value.isEmpty ? 'Enter a value' : null,
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _metric2Controller,
            decoration: const InputDecoration(
              labelText: 'Total Water Recharged (Liters / Annum)',
              hintText: 'e.g., 500,000 Liters',
            ),
            validator: (value) => value == null || value.isEmpty ? 'Enter a value' : null,
          ),
        ],
      );
    } else if (_selectedCategory == 'Plastic-Free Village Award') {
      return Column(
        children: [
          TextFormField(
            controller: _metric1Controller,
            decoration: const InputDecoration(
              labelText: 'Plastic Waste Collected & Processed (kg/month)',
              hintText: 'e.g., 420 kg',
            ),
            validator: (value) => value == null || value.isEmpty ? 'Enter a value' : null,
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _metric2Controller,
            decoration: const InputDecoration(
              labelText: 'Fine Imposed for Single-Use Plastic Violations (INR)',
              hintText: 'e.g., 2,500 INR',
            ),
            validator: (value) => value == null || value.isEmpty ? 'Enter a value' : null,
          ),
        ],
      );
    } else {
      // Default fallback indicators
      return Column(
        children: [
          TextFormField(
            controller: _metric1Controller,
            decoration: const InputDecoration(
              labelText: 'Total Direct Beneficiaries (People/Households)',
              hintText: 'e.g., 1,500 people',
            ),
            validator: (value) => value == null || value.isEmpty ? 'Enter beneficiary count' : null,
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _metric2Controller,
            decoration: const InputDecoration(
              labelText: 'Villages / Wards Fully Covered',
              hintText: 'e.g., 5 Wards',
            ),
            validator: (value) => value == null || value.isEmpty ? 'Enter coverage value' : null,
          ),
        ],
      );
    }
  }

  Widget _buildStep3SdgsDeclaration() {
    return Form(
      key: _step3Key,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Select Mapped UN SDGs',
            style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          ListView(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            children: _sdgMap.keys.map((String key) {
              return CheckboxListTile(
                title: Text(key, style: const TextStyle(fontSize: 13)),
                value: _sdgMap[key],
                activeColor: const Color(0xFFFF9933),
                onChanged: (bool? val) {
                  setState(() {
                    _sdgMap[key] = val!;
                  });
                },
              );
            }).toList(),
          ),
          const SizedBox(height: 32),
          Text(
            'Declaration & Acknowledgement',
            style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFF1E293B),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: const Color(0xFF334155), width: 1),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Checkbox(
                  value: _declared,
                  activeColor: const Color(0xFFFF9933),
                  onChanged: (bool? val) {
                    setState(() {
                      _declared = val!;
                    });
                  },
                ),
                Expanded(
                  child: Text(
                    'I hereby declare that the information provided in this nomination form is accurate, complete, and verifiable to the best of my knowledge. I understand that any false declarations may lead to rejection of this application.',
                    style: GoogleFonts.inter(fontSize: 11, height: 1.4),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomButtons() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      color: const Color(0xFF0F172A),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          if (currentStep > 0)
            OutlinedButton(
              style: OutlinedButton.styleFrom(
                side: const BorderSide(color: Color(0xFF334155)),
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              onPressed: isSubmitting ? null : _prevStep,
              child: Text('Back', style: GoogleFonts.outfit(color: Colors.white)),
            )
          else
            const SizedBox.shrink(),
          Expanded(
            child: Padding(
              padding: EdgeInsets.only(left: currentStep > 0 ? 16.0 : 0.0),
              child: ElevatedButton(
                onPressed: isSubmitting
                    ? null
                    : (currentStep == totalSteps - 1 ? _submitNomination : _nextStep),
                child: isSubmitting
                    ? const SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                      )
                    : Text(currentStep == totalSteps - 1 ? 'Submit' : 'Continue'),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
