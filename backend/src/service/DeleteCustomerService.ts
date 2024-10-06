import prismaClient from '../prisma';

interface DeleteCustomerProps {
    id: string;
}

class DeleteCustomerService {
    async execute({ id }: DeleteCustomerProps) {
        // Lançar erro para id inválido
        if (!id) {
            throw new Error("Solicitação inválida");
        }

        // Procurar cliente no banco de dados
        const findCustomer = await prismaClient.customer.findFirst({
            where: {
                id: id
            }
        });

        // Verificar se o cliente foi encontrado
        if (!findCustomer) {
            throw new Error("Cliente não existe");
        }

        // Aqui você pode adicionar o código para deletar o cliente
        await prismaClient.customer.delete({
            where: {
                id: findCustomer.id
            }
        });
        return { message: "Cliente deletado com sucesso" };
    }
}

export { DeleteCustomerService };
