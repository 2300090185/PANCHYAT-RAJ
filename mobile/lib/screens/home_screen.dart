import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../services/api_service.dart';
import '../models/nomination.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int totalNominations = 0;
  int approvedAwards = 0;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadStats();
  }

  Future<void> _loadStats() async {
    try {
      final list = await ApiService.getNominations();
      setState(() {
        totalNominations = list.length;
        approvedAwards = list.where((n) => n.status.toLowerCase().contains('recommend') || n.status.toLowerCase().contains('approve')).length;
        isLoading = false;
      });
    } catch (e) {
      // Keep defaults if server is not running yet
      setState(() {
        totalNominations = 3; // seeded default
        approvedAwards = 1;
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _loadStats,
          color: const Color(0xFFFF9933),
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header section
                _buildHeader(),
                const SizedBox(height: 24),

                // Live Stats Banner
                _buildStatsBanner(),
                const SizedBox(height: 32),

                // Quick Navigation Actions
                Text(
                  'Quick Actions',
                  style: GoogleFonts.outfit(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 16),
                _buildQuickActions(),
                const SizedBox(height: 32),

                // Showcased Winners / Categories
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Featured Award Winners',
                      style: GoogleFonts.outfit(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    Icon(
                      Icons.star,
                      color: const Color(0xFFFF9933),
                    )
                  ],
                ),
                const SizedBox(height: 16),
                _buildWinnersShowcase(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                // Flag inspired tricolor indicator
                Container(width: 4, height: 16, color: const Color(0xFFFF9933)),
                const SizedBox(width: 4),
                Container(width: 4, height: 16, color: Colors.white),
                const SizedBox(width: 4),
                Container(width: 4, height: 16, color: const Color(0xFF138808)),
                const SizedBox(width: 8),
                Text(
                  'GOVERNMENT OF INDIA',
                  style: GoogleFonts.outfit(
                    fontSize: 11,
                    fontWeight: FontWeight.w800,
                    color: const Color(0xFFFF9933),
                    letterSpacing: 1.5,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 4),
            Text(
              'Viksit Bharat',
              style: GoogleFonts.outfit(
                fontSize: 28,
                fontWeight: FontWeight.w900,
                color: Colors.white,
              ),
            ),
            Text(
              'Panchayati Raj Awards',
              style: GoogleFonts.inter(
                fontSize: 14,
                color: const Color(0xFF94A3B8),
              ),
            ),
          ],
        ),
        Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: const Color(0xFF161F30),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: const Color(0xFF334155), width: 1),
          ),
          child: const Icon(
            Icons.notifications_active_outlined,
            color: Color(0xFFFF9933),
            size: 24,
          ),
        )
      ],
    );
  }

  Widget _buildStatsBanner() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            const Color(0xFF1E293B),
            const Color(0xFF0F172A),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFF334155), width: 1.2),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFFFF9933).withOpacity(0.05),
            blurRadius: 15,
            spreadRadius: 2,
          )
        ]
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildStatItem('Total Nominees', isLoading ? '...' : totalNominations.toString(), Icons.people_outline, const Color(0xFFFF9933)),
          Container(width: 1, height: 50, color: const Color(0xFF334155)),
          _buildStatItem('Recommended', isLoading ? '...' : approvedAwards.toString(), Icons.emoji_events_outlined, const Color(0xFF10B981)),
          Container(width: 1, height: 50, color: const Color(0xFF334155)),
          _buildStatItem('SDG Goals Map', '17/17', Icons.public_outlined, Colors.cyan),
        ],
      ),
    );
  }

  Widget _buildStatItem(String label, String value, IconData icon, Color color) {
    return Column(
      children: [
        Icon(icon, color: color, size: 26),
        const SizedBox(height: 8),
        Text(
          value,
          style: GoogleFonts.outfit(
            fontSize: 22,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: GoogleFonts.inter(
            fontSize: 11,
            fontWeight: FontWeight.w500,
            color: const Color(0xFF64748B),
          ),
        ),
      ],
    );
  }

  Widget _buildQuickActions() {
    return GridView.count(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 2,
      crossAxisSpacing: 16,
      mainAxisSpacing: 16,
      childAspectRatio: 1.4,
      children: [
        _buildActionCard(
          'Submit Nomination',
          'Apply under 16 categories',
          Icons.note_add_outlined,
          const Color(0xFFFF9933),
          () => Navigator.pushNamed(context, '/nomination'),
        ),
        _buildActionCard(
          'Track Application',
          'Check review status live',
          Icons.track_changes_outlined,
          Colors.cyan,
          () => Navigator.pushNamed(context, '/tracker'),
        ),
        _buildActionCard(
          'Register NGO/CSR',
          'Join rural transformation',
          Icons.handshake_outlined,
          const Color(0xFF10B981),
          () => Navigator.pushNamed(context, '/register'),
        ),
        _buildActionCard(
          'Official Website',
          'View results & portals',
          Icons.language_outlined,
          Colors.indigoAccent,
          () {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Opening Ministry Website (https://panchayat.gov.in)...')),
            );
          },
        ),
      ],
    );
  }

  Widget _buildActionCard(String title, String subtitle, IconData icon, Color color, VoidCallback onTap) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: const Color(0xFF161F30),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFF334155), width: 1),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(icon, color: color, size: 24),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: GoogleFonts.outfit(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    subtitle,
                    style: GoogleFonts.inter(
                      fontSize: 10,
                      color: const Color(0xFF64748B),
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildWinnersShowcase() {
    final List<Map<String, String>> winners = [
      {
        'name': 'Pippalantri Gram Panchayat',
        'location': 'Rajasthan',
        'category': 'Water Conservation',
        'impact': '111 trees planted per female child. Revived local aquifers.'
      },
      {
        'name': 'Hiware Bazar',
        'location': 'Maharashtra',
        'category': 'Smart Village & Hydrology',
        'impact': 'Zero open defecation. 100% water security and income parity.'
      },
      {
        'name': 'Punsari Gram Panchayat',
        'location': 'Gujarat',
        'category': 'Digital Village',
        'impact': 'WiFi enabled, mineral water purification plant, local bus system.'
      }
    ];

    return SizedBox(
      height: 180,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: winners.length,
        itemBuilder: (context, index) {
          final item = winners[index];
          return Container(
            width: 280,
            margin: const EdgeInsets.only(right: 16),
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  const Color(0xFF1E293B),
                  const Color(0xFF0F172A),
                ],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: const Color(0xFF334155), width: 1),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        item['name']!,
                        style: GoogleFonts.outfit(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: const Color(0xFFFF9933).withOpacity(0.15),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        item['location']!,
                        style: GoogleFonts.inter(
                          fontSize: 9,
                          fontWeight: FontWeight.bold,
                          color: const Color(0xFFFF9933),
                        ),
                      ),
                    )
                  ],
                ),
                Text(
                  'Category: ${item['category']}',
                  style: GoogleFonts.inter(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: const Color(0xFF10B981),
                  ),
                ),
                Text(
                  item['impact']!,
                  style: GoogleFonts.inter(
                    fontSize: 11,
                    color: const Color(0xFF94A3B8),
                  ),
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
