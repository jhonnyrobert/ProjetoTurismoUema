import 'package:flutter/material.dart';

class SingUpButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FlatButton(
      padding: EdgeInsets.only(top: 160),
      onPressed: () {},
      child: Text(
        "Não Possui Conta ? Cadastre-se",
        textAlign: TextAlign.center,
        style: TextStyle(
            fontWeight: FontWeight.w300,
            color: Colors.white,
            fontSize: 20,
            letterSpacing: 0.5),
      ),
    );
  }
}
