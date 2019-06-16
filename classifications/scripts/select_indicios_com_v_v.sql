select i.id, i.projeto, i.entidade, i.metrica,
(select resposta from resposta where id_indicio = i.id limit 1) as resposta 
from indicio i
where 
(
	select count(*) from resposta where id_indicio = i.id and resposta = true
) = 2;
