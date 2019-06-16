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