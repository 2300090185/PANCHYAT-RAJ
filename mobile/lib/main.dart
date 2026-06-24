import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/home_screen.dart';
import 'screens/nomination_form.dart';
import 'screens/status_tracker.dart';
import 'screens/registration_screen.dart';

void main() {
  runApp(const PanchayatRajApp());
}

class PanchayatRajApp extends StatelessWidget {
  const PanchayatRajApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Premium dark mode theme matching the glassmorphic web styling
    final darkTheme = ThemeData(
      brightness: Brightness.dark,
      primaryColor: const Color(0xFFFF9933), // Saffron accent
      scaffoldBackgroundColor: const Color(0xFF0B0F19), // Deep Navy/Black
      cardColor: const Color(0xFF161F30), // Indigo dark card
      colorScheme: const ColorScheme.dark(
        primary: Color(0xFFFF9933),
        secondary: Color(0xFF138808), // India Green accent
        surface: Color(0xFF161F30),
        error: Color(0xFFEF4444),
      ),
      textTheme: GoogleFonts.outfitTextTheme(ThemeData.dark().textTheme).copyWith(
        displayLarge: GoogleFonts.outfit(
          fontSize: 32,
          fontWeight: FontWeight.w900,
          color: Colors.white,
          letterSpacing: -0.5,
        ),
        titleLarge: GoogleFonts.outfit(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
        bodyLarge: GoogleFonts.inter(
          fontSize: 16,
          color: const Color(0xFF94A3B8), // slate-400
        ),
        bodyMedium: GoogleFonts.inter(
          fontSize: 14,
          color: const Color(0xFF64748B), // slate-500
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: const Color(0xFF0B0F19),
        elevation: 0,
        centerTitle: true,
        titleTextStyle: GoogleFonts.outfit(
          fontSize: 20,
          fontWeight: FontWeight.w800,
          color: Colors.white,
          letterSpacing: 0.5,
        ),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFF1E293B),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFF334155), width: 1),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFFFF9933), width: 1.5),
        ),
        labelStyle: GoogleFonts.inter(color: const Color(0xFF94A3B8)),
        hintStyle: GoogleFonts.inter(color: const Color(0xFF64748B)),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFFFF9933),
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 24),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: GoogleFonts.outfit(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );

    return MaterialApp(
      title: 'Panchayat Raj Social Impact Portal',
      theme: darkTheme,
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (context) => const HomeScreen(),
        '/nomination': (context) => const NominationFormScreen(),
        '/tracker': (context) => const StatusTrackerScreen(),
        '/register': (context) => const RegistrationScreen(),
      },
    );
  }
}
