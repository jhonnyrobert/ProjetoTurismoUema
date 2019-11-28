-- Criacao de Banco de Dados (utf-8)
create database titullo DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
use titullo;

-- Criacao da tabela de usuarios
-- campo tipo -- a-administrador, c-comum
create table usuarios (
	id int(11) auto_increment not null primary key,
	nome varchar(255),
	usuario varchar(50) not null unique key,
	email varchar(255) not null unique key,
	senha varchar(255) not null,
	foto varchar(255),
	sexo varchar (1),
	nascimento date,
	cpf varchar(11) unique key,
	ddd varchar(2) default '98',
	telefone varchar(25),
	tipo varchar(1) not null default 'c',

	_delete varchar(1) default ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Inserindo usuario 'admin'
insert into usuarios (nome, usuario, email, senha, tipo) values 
	("admin", "admin", "contato@solutera.com.br", md5("admin"), 'a');

-- Criacao da tabela de estabelecimentos
create table estabelecimentos (
    id int(11) auto_increment not null primary key,
	idUsuario int(11),
    nome varchar(255) not null,
    foto varchar(255),
	telefone varchar(25),
	celular varchar(25),
	email varchar(255),
    latitude decimal (9,7),
	longitude decimal (10,7),
	
	foreign key (idUsuario) references usuarios(id),
	_delete varchar(1) not null default ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;