import 'package:flutter/material.dart';

class InputFild extends StatelessWidget {
  final String hint;
  final bool obscure;
  final IconData icon;

  InputFild({this.hint, this.obscure, this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          border: Border(
              bottom: BorderSide(
        color: Colors.white,
        width: 0.7,
      ))),
      child: TextFormField(
        obscureText: obscure,
        style: TextStyle(color: Colors.white),
        decoration: InputDecoration(
          icon: Icon(
            icon,
            color: Colors.white,
          ),
          border: InputBorder.none,
          hintText: hint,
          hintStyle: TextStyle(
            color: Colors.white,
            fontSize: 20,
          ),
          contentPadding:
              EdgeInsets.only(top: 30, right: 30, bottom: 30, left: 20),
        ),
      ),
    );
  }
}
