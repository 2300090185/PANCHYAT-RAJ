import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../services/api_service.dart';
import '../models/nomination.dart';

class StatusTrackerScreen extends StatefulWidget {
  const StatusTrackerScreen({super.key});

  @override
  State<StatusTrackerScreen> createState() => _StatusTrackerScreenState();
}

class _StatusTrackerScreenState extends State<StatusTrackerScreen> {
  final TextEditingController _searchController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  
  bool isSearching = false;
  Nomination? trackedNomination;
  String? searchError;

  Future<void> _trackApplication() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      isSearching = true;
      trackedNomination = null;
      searchError = null;
    });

    try {
      final result = await ApiService.trackNomination(_searchController.text);
      setState(() {
        isSearching = false;
        if (result != null) {
          trackedNomination = result;
        } else {
          searchError = 'No application found with reference ID "${_searchController.text.trim()}".';
        }
      });
    } catch (e) {
      setState(() {
        isSearching = false;
        searchError = 'Failed to fetch tracking data: ${e.toString()}';
      });
    }
  }

  Color _getStatusColor(String status) {
    switch (status.toLowerCase()) {
      case 'pending':
        return const Color(0xFFFF9933); // Orange
      case 'under review':
      case 'information requested':
        return Colors.yellow[700]!;
      case 'approved':
      case 'recommended':
      case 'award recommended':
        return const Color(0xFF10B981); // Green
      case 'rejected':
        return Colors.redAccent;
      default:
        return Colors.blueAccent;
    }
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Track Application'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Track Your Nomination Status',
                style: GoogleFonts.outfit(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Enter the application reference ID (e.g. nom-105) provided in your registration success email or dialog.',
                style: GoogleFonts.inter(
                  fontSize: 13,
                  color: const Color(0xFF94A3B8),
                ),
              ),
              const SizedBox(height: 24),

              // Search Box Form
              Form(
                key: _formKey,
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: TextFormField(
                        controller: _searchController,
                        decoration: const InputDecoration(
                          hintText: 'Enter Reference ID (e.g., nom-123)',
                          prefixIcon: Icon(Icons.search, color: Color(0xFFFF9933)),
                        ),
                        validator: (value) => value == null || value.isEmpty ? 'Please enter a valid Reference ID' : null,
                        textInputAction: TextInputAction.search,
                        onFieldSubmitted: (_) => _trackApplication(),
                      ),
                    ),
                    const SizedBox(width: 12),
                    SizedBox(
                      height: 56,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        onPressed: isSearching ? null : _trackApplication,
                        child: isSearching
                            ? const SizedBox(
                                width: 24,
                                height: 24,
                                child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                              )
                            : const Icon(Icons.arrow_forward),
                      ),
                    )
                  ],
                ),
              ),
              const SizedBox(height: 32),

              // Error banner
              if (searchError != null) _buildErrorBanner(),

              // Nomination tracking view
              if (trackedNomination != null) _buildTrackingResult(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildErrorBanner() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.redAccent.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.redAccent.withOpacity(0.5), width: 1),
      ),
      child: Row(
        children: [
          const Icon(Icons.error_outline, color: Colors.redAccent),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              searchError!,
              style: GoogleFonts.inter(color: Colors.white, fontSize: 13),
            ),
          )
        ],
      ),
    );
  }

  Widget _buildTrackingResult() {
    final nom = trackedNomination!;
    final statusColor = _getStatusColor(nom.status);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // App Card Header
        Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            color: const Color(0xFF161F30),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFF334155), width: 1),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    nom.id.toUpperCase(),
                    style: GoogleFonts.outfit(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: const Color(0xFFFF9933),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      color: statusColor.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: statusColor, width: 1),
                    ),
                    child: Text(
                      nom.status.toUpperCase(),
                      style: GoogleFonts.inter(
                        fontSize: 10,
                        fontWeight: FontWeight.w800,
                        color: statusColor,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                nom.projectName,
                style: GoogleFonts.outfit(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                'Category: ${nom.category}',
                style: GoogleFonts.inter(
                  fontSize: 12,
                  color: const Color(0xFF94A3B8),
                ),
              ),
              const SizedBox(height: 8),
              const Divider(color: Color(0xFF334155)),
              const SizedBox(height: 8),
              _buildInfoRow('Nominee', nom.fullName),
              _buildInfoRow('Location', '${nom.panchayat}, ${nom.district}, ${nom.state}'),
              if (nom.fieldVisit.isNotEmpty)
                _buildInfoRow('Field Visit Scheduled', nom.fieldVisit),
              if (nom.juryRemarks.isNotEmpty)
                _buildInfoRow('Jury Panel Remarks', nom.juryRemarks),
            ],
          ),
        ),
        const SizedBox(height: 32),

        // Stepper Visualizer
        Text(
          'Verification Timeline',
          style: GoogleFonts.outfit(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        const SizedBox(height: 20),
        _buildVerificationTimeline(nom.status),
      ],
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 130,
            child: Text(
              label,
              style: GoogleFonts.inter(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                color: const Color(0xFF64748B),
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: GoogleFonts.inter(
                fontSize: 12,
                color: Colors.white,
              ),
            ),
          )
        ],
      ),
    );
  }

  Widget _buildVerificationTimeline(String currentStatus) {
    final status = currentStatus.toLowerCase();
    
    // Process step values
    bool step1Done = true; // Submission is always done
    bool step2Done = status != 'pending';
    bool step3Done = status == 'recommended' || status == 'award recommended' || status == 'approved';
    bool step4Done = status == 'award recommended' || status == 'approved' || status == 'rejected';

    return Column(
      children: [
        _buildTimelineNode(
          'Application Submitted',
          'Nomination records registered, emails dispatched.',
          step1Done,
          false,
        ),
        _buildTimelineNode(
          'Level-1 Verification',
          'Block & District authorities verifying evidence metrics.',
          step2Done,
          status == 'pending',
        ),
        _buildTimelineNode(
          'Jury Panel Evaluation',
          'Screening committee scoring and field verification assessment.',
          step3Done,
          status == 'under review' || status == 'information requested',
        ),
        _buildTimelineNode(
          'Final Decision',
          status == 'rejected' ? 'Application rejected.' : 'Ministry approval & National Award selection.',
          step4Done,
          status == 'recommended',
        ),
      ],
    );
  }

  Widget _buildTimelineNode(String title, String subtitle, bool isCompleted, bool isCurrent) {
    final nodeColor = isCompleted
        ? const Color(0xFF138808) // Tricolor green
        : isCurrent
            ? const Color(0xFFFF9933) // Tricolor orange
            : const Color(0xFF334155);

    return IntrinsicHeight(
      child: Row(
        children: [
          Column(
            children: [
              Container(
                width: 20,
                height: 20,
                decoration: BoxDecoration(
                  color: isCompleted ? nodeColor : const Color(0xFF0B0F19),
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: nodeColor,
                    width: 3,
                  ),
                ),
                child: isCompleted
                    ? const Icon(Icons.check, size: 10, color: Colors.white)
                    : null,
              ),
              Expanded(
                child: Container(
                  width: 2,
                  color: nodeColor.withOpacity(0.5),
                ),
              ),
            ],
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.only(bottom: 24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: GoogleFonts.outfit(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: isCurrent ? const Color(0xFFFF9933) : Colors.white,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: GoogleFonts.inter(
                      fontSize: 11,
                      color: const Color(0xFF94A3B8),
                    ),
                  ),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
