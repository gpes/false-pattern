select 
* 
from indicio i
where 
(
	select count(*) from resposta where id_indicio = i.id and resposta = true
) = 1
and
(
	select count(*) from resposta where id_indicio = i.id and resposta = false
) = 1;

\copy (select i.projeto, i.entidade, i.link, i.metrica from indicio i where (select count(*) from resposta where id_indicio = i.id and resposta = true) = 1 and (select count(*) from resposta where id_indicio = i.id and resposta = false) = 1) to './../classifications-data/indicios-v-f.csv' with csv header;