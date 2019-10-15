import 'package:flutter/material.dart';
import 'package:qr_code/screens/login/widgets/input_fild.dart';

class FormContainer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 20),
      child: Form(
        child: Column(
          children: <Widget>[
            InputFild(
              hint: "Usuário",
              obscure: false,
              icon: Icons.person_outline,
            ),
            InputFild(
              hint: "Senha",
              obscure: true,
              icon: Icons.lock_outline,
            )
          ],
        ),
      ),
    );
  }
}
