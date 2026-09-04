package com.senac.biblioteca.service;

import com.senac.biblioteca.model.Livro;
import com.senac.biblioteca.repository.LivroRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LivroServiceTest {

    @Mock
    private LivroRepository livroRepository;

    @InjectMocks
    private LivroService livroService;

    @Test
    void buscarPorIdQuandoNaoExisteDeveRetornar404() {
        when(livroRepository.findById(99L)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> livroService.buscarPorId(99L)
        );

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
    }

    @Test
    void decrementarDisponibilidadeNaoPodeFicarNegativa() {
        Livro livro = new Livro();
        livro.setId(1L);
        livro.setQuantidadeDisponivel(0);

        when(livroRepository.findById(1L)).thenReturn(Optional.of(livro));

        IllegalStateException exception = assertThrows(
                IllegalStateException.class,
                () -> livroService.decrementarDisponibilidade(1L)
        );

        assertEquals("Livro indisponível para empréstimo.", exception.getMessage());
        assertEquals(0, livro.getQuantidadeDisponivel());
    }
}
