'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');


exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 4, 'O nome deve conter pelo menos 4 caracteres.');
    contract.hasMinLen(req.body.email, 3, 'Email inválido.');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres.');

    //Se os dados forem válidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        //Tudo que vem na requisição, atribuo para o corpo do meu produto.
        await repository.create(req.body)
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    }
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        })
    }
};