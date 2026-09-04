package com.senac.biblioteca.service;

import com.senac.biblioteca.model.Emprestimo;
import com.senac.biblioteca.model.StatusEmprestimo;
import com.senac.biblioteca.repository.EmprestimoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EmprestimoServiceTest {

    @Mock
    private EmprestimoRepository emprestimoRepository;

    @Mock
    private LivroService livroService;

    @InjectMocks
    private EmprestimoService emprestimoService;

    @Test
    void listarAtrasadosDeveRetornarSomenteEmprestimosVencidos() {
        Emprestimo atrasado = new Emprestimo();
        atrasado.setId(1L);
        atrasado.setStatus(StatusEmprestimo.ATIVO);
        atrasado.setDataDevolucaoPrevista(LocalDate.now().minusDays(2));

        Emprestimo emDia = new Emprestimo();
        emDia.setId(2L);
        emDia.setStatus(StatusEmprestimo.ATIVO);
        emDia.setDataDevolucaoPrevista(LocalDate.now().plusDays(2));

        when(emprestimoRepository.findAll()).thenReturn(List.of(atrasado, emDia));

        List<Emprestimo> atrasados = emprestimoService.listarAtrasados();

        assertEquals(1, atrasados.size());
        assertEquals(1L, atrasados.get(0).getId());
    }
}
